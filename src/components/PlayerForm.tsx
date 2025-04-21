"use client"

import { Button } from "@/components/shared/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/shared/ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/shared/ui/form"
import { Input } from "@/components/shared/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import type { ReactNode } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
	username1: z.string().min(1, "入力してください"),
	username2: z.string().min(1, "入力してください"),
})

interface Props {
	children: ReactNode
}

export const PlayerSaveForm = ({ children }: Props) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username1: "",
			username2: "",
		},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
				<DialogHeader>
					<DialogTitle>ゲーム準備</DialogTitle>
					<DialogDescription>
						対戦する2人のプレイヤー名を入力してください
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="username1"
							render={({ field }) => (
								<FormItem>
									<FormLabel>プレイヤー1</FormLabel>
									<FormControl>
										<Input placeholder="名前を入力" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="username2"
							render={({ field }) => (
								<FormItem>
									<FormLabel>プレイヤー2</FormLabel>
									<FormControl>
										<Input placeholder="名前を入力" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-end">
							<Button className="" type="submit">
								登録
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
