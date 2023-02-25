"use client"
import { signIn } from "next-auth/react";

export default function Signin() {
	return (
	<button onClick={()=> {
		void signIn()
 }}>
	 Sign in
 </button>
 )
}