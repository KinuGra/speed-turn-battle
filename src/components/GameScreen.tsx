"use client"
import { useEffect, useState } from "react"
import { question } from "../data/questions"
import { Button } from "./shared/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "./shared/ui/dialog"

interface GameScreenProps {
	player1: string
	player2: string
}

const GameScreen = ({ player1, player2 }: GameScreenProps) => {
	const [time, setTime] = useState(0)
	const [answer, setAnswer] = useState("")
	const [usedAnswers, setUsedAnswers] = useState<string[]>([])
	const [currentPlayer, setCurrentPlayer] = useState(0)
	const [notification, setNotification] = useState("")
	const [isModalOpen, setIsModalOpen] = useState(false)
	const players = [player1, player2]

	const handleClick = () => {
		const normalizedAnswer = answer.toLowerCase()

		if (usedAnswers.includes(normalizedAnswer)) {
			setNotification("既に回答されています。再度回答を入力してください。")
			setAnswer("")
			return
		}

		const isCorrect = question.some((item) =>
			item.answer.includes(normalizedAnswer),
		)
		if (isCorrect) {
			setUsedAnswers((prev) => [...prev, normalizedAnswer])
			setCurrentPlayer((prev) => (prev + 1) % 2)
			setNotification("")
			setIsModalOpen(true)
		} else {
			setNotification("不正解です。再度回答を入力してください。")
		}
		setAnswer("")
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime((prev) => prev + 1)
		}, 1000)

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	return (
		<div className="h-screen flex flex-col justify-between">
			{/* モーダル */}
			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{players[currentPlayer]}さんのターンです</DialogTitle>
					</DialogHeader>
					<div className="flex justify-center mt-4">
						<Button onClick={() => setIsModalOpen(false)}>OK</Button>
					</div>
				</DialogContent>
			</Dialog>

			<div className="border-2 border-gray-300 rounded p-4 bg-cyan-50 shadow-md w-1/2 mx-auto mt-5">
				<div className="flex flex-col justify-center items-center">
					<h1 className="text-center font-bold text-2xl">問題</h1>
				</div>
				<div>
					{question.map((item) => (
						<div
							key={item.id}
							className="flex flex-col justify-center items-center mt-5"
						>
							<h2 className="text-center font-bold text-2xl">
								{item.question}
							</h2>
						</div>
					))}
				</div>
				<div>
					<p className="text-center font-bold mt-3">経過時間：{time}秒</p>
				</div>
				<div>
					<p className="text-center font-bold mt-3">
						現在のターン: {players[currentPlayer]}さん
					</p>
				</div>
				<div>
					<p className="text-center text-red-500 mt-3">{notification}</p>
				</div>
			</div>

			<div className="border-2 border-gray-300 rounded p-4 bg-white shadow-md w-3/4 max-w-130 mx-auto mb-5">
				<div className="flex flex-col gap-4">
					<div className="flex gap-2 items-center max-w-md w-full">
						<input
							id="answer"
							type="text"
							autoComplete="off"
							value={answer}
							onChange={(e) => setAnswer(e.target.value)}
							placeholder="ここに回答を入力"
							className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
						/>
						<Button type="button" onClick={handleClick}>
							回答
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GameScreen
