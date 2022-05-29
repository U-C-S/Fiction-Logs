import React from "react";
import { useForm, useToggle } from "@mantine/hooks";
import {
	TextInput,
	PasswordInput,
	Text,
	Paper,
	Group,
	PaperProps,
	Button,
	Divider,
	Checkbox,
	Anchor,
} from "@mantine/core";

export function LoginForm(props: PaperProps<"div">) {
	const [type, toggle] = useToggle("Login", ["Login", "Register"]);

	const form = useForm({
		initialValues: {
			email: "",
			name: "",
			password: "",
			terms: true,
		},

		validationRules: {
			email: val => /^\S+@\S+$/.test(val),
			password: val => val.length >= 8,
		},
	});

	function onSubmit(values: any) {
		console.log(values);
	}

	return (
		<Paper radius="md" p="xl" withBorder {...props}>
			<Text size="lg" weight={500} align="center">
				{type}
			</Text>

			<form onSubmit={form.onSubmit(onSubmit)}>
				<Group direction="column" grow>
					{type === "Register" && (
						<TextInput
							label="Name"
							placeholder="Your name"
							value={form.values.name}
							onChange={event => form.setFieldValue("name", event.currentTarget.value)}
						/>
					)}

					<TextInput
						required
						label="Email"
						placeholder="hello@films.com"
						value={form.values.email}
						onChange={event => form.setFieldValue("email", event.currentTarget.value)}
						error={form.errors.email && "Invalid email"}
					/>

					<PasswordInput
						required
						label="Password"
						placeholder="Your password"
						value={form.values.password}
						onChange={event => form.setFieldValue("password", event.currentTarget.value)}
						error={form.errors.password && "Password should include at least 8 characters"}
					/>

					{type === "Register" && (
						<Checkbox
							label="I accept terms and conditions"
							checked={form.values.terms}
							onChange={event => form.setFieldValue("terms", event.currentTarget.checked)}
						/>
					)}
				</Group>

				<Group position="apart" mt="xl">
					<Anchor component="button" type="button" color="gray" onClick={() => toggle()} size="xs">
						{type === "Register" ? "Already have an account? Login" : "Don't have an account? Register"}
					</Anchor>
					<Button type="submit">{type}</Button>
				</Group>
			</form>
		</Paper>
	);
}
