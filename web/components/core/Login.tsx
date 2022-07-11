import React, { useContext } from "react";
import { useForm, useToggle } from "@mantine/hooks";
import {
	TextInput,
	PasswordInput,
	Text,
	Paper,
	Group,
	PaperProps,
	Button,
	Checkbox,
	Anchor,
} from "@mantine/core";
import Router from "next/router";
import { AuthContext } from "../context/authContext";

export function LoginForm(props: PaperProps<"div">) {
	const [formType, toggleFormType] = useToggle("login", ["login", "register"]);
	const { authData, setAuth } = useContext(AuthContext);

	const form = useForm({
		initialValues: {
			email: "",
			name: "",
			password: "",
			terms: true,
		},

		// validationRules: {
		// 	email: val => /^\S+@\S+$/.test(val),
		// 	password: val => val.length >= 4,
		// },
	});

	if (authData) Router.push("/me");

	const submitEvent = async (values: typeof form.values) => {
		console.log(values);

		let fetchOpts = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: values.email,
				name: values.name,
				password: values.password,
			}),
		};

		let res = await fetch(`${process.env.API_URL}/auth/${formType}`, fetchOpts);
		let resData = await res.json();

		console.log(resData);
		if (resData.success) {
			localStorage.setItem("token", resData.data.token);
			localStorage.setItem("userName", resData.data.username);
			setAuth({ userName: resData.data.username, token: resData.data.token });
			// Router.push(`/me`);
		}
	};

	return (
		<Paper radius="md" p="xl" withBorder {...props}>
			<Text size="lg" weight={500} align="center">
				{formType}
			</Text>

			<form onSubmit={form.onSubmit(submitEvent)}>
				<Group direction="column" grow>
					{formType === "register" && (
						<TextInput
							required
							label="Email"
							placeholder="hello@films.com"
							value={form.values.email}
							onChange={event => form.setFieldValue("email", event.currentTarget.value)}
							error={form.errors.email && "Invalid email"}
						/>
					)}

					<TextInput
						required
						label="Name"
						placeholder="Your name"
						value={form.values.name}
						onChange={event => form.setFieldValue("name", event.currentTarget.value)}
					/>

					<PasswordInput
						required
						label="Password"
						placeholder="Your password"
						value={form.values.password}
						onChange={event => form.setFieldValue("password", event.currentTarget.value)}
						error={form.errors.password && "Password should include at least 8 characters"}
					/>

					{formType === "register" && (
						<Checkbox
							label="I accept terms and conditions"
							checked={form.values.terms}
							onChange={event => form.setFieldValue("terms", event.currentTarget.checked)}
						/>
					)}
				</Group>

				<Group position="apart" mt="xl">
					<Anchor component="button" type="button" color="gray" onClick={() => toggleFormType()} size="xs">
						{formType === "register" ? "Already have an account? Login" : "Don't have an account? Register"}
					</Anchor>
					<Button type="submit">{formType}</Button>
				</Group>
			</form>
		</Paper>
	);
}
