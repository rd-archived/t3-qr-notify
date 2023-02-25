"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractEnumValues } from "~/utils/zod";
import axios from "axios";
import type { SettingsPostResponse } from "~/pages/api/user/settings";

import { useRouter } from "next/navigation";

const schema = z.object({
  phone: z.coerce.number().refine((v) => String(v).length === 10, {
    message: "Phone number must be 10 digits",
  }),
  gender: z.enum(["Male", "Female"]),
});

type IFieldsValues = z.infer<typeof schema>;

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFieldsValues>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = (fieldData: IFieldsValues) => {
    axios
      .post<SettingsPostResponse>("/api/user/settings", fieldData)
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
      <div className="grid gap-10">
        <div>
          <input
            type="text"
            {...register("phone")}
            placeholder="Phone"
            className="input"
          />
          {errors.phone && (
            <p className="text-error">Please enter valid phone number</p>
          )}
        </div>
        <div>
          <select {...register("gender")} className="select">
            <option value="">Select...</option>
            {extractEnumValues(schema, "gender").map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          {errors.gender && (
            <p className="text-error">Please select a gender</p>
          )}
        </div>
        <div>
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
