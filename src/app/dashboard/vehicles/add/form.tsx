"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { VehicleCreateResponse } from "~/pages/api/vehicle/create";
import { extractEnumValues } from "~/utils/zod";

const schema = z.object({
  title: z.string().min(3).max(50),
  type: z.enum(["Car", "Bike"]),
  vehicleNo: z.string().length(10),
});

type IFieldValues = z.infer<typeof schema>;

export default function VehicleAddForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFieldValues>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const onSubmit = (fieldData: IFieldValues) => {
    axios
      .post<VehicleCreateResponse>("/api/vehicle/create", fieldData)
      .then(({ data }) => {
        if (data.success) {
          router.replace("/dashboard");
        }
      })
      .catch(() => {
        // TODO: Handle error
      });
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} method="POST">
      <div className="mt-10 grid gap-5">
        <div>
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="input"
          />
          {errors.title && <p className="text-error">{errors.title.message}</p>}
        </div>
        <div>
          <select {...register("type")} className="select">
            <option value="">Select..</option>
            {extractEnumValues(schema, "type").map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          {errors.type && <p className="text-error">{errors.type.message}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Vehicle No"
            {...register("vehicleNo")}
            className="input"
          />
          {errors.vehicleNo && (
            <p className="text-error">{errors.vehicleNo.message}</p>
          )}
        </div>
        <div>
          <button type="submit" className="btn">
            Create
          </button>
        </div>
      </div>
    </form>
  );
}
