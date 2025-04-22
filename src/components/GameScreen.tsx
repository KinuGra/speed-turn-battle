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
	targetCorrectAnswers: number
	onGameEnd: (resultData: any) => void
}

const GameScreen = ({
	player1,
	player2,
	targetCorrectAnswers,
	onGameEnd,
}: GameScreenProps) => {
	const [time, setTime] = useState(0)
	const [answer, setAnswer] = useState("")
	const [usedAnswers, setUsedAnswers] = useState<string[]>([])
	const [currentPlayer, setCurrentPlayer] = useState(0)
	const [notification, setNotification] = useState("")
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [playerRecords, setPlayerRecords] = useState([
		{ name: player1, correctAnswers: 0, answers: [] as string[] },
		{ name: player2, correctAnswers: 0, answers: [] as string[] },
	])
	const [correctAnswers, setCorrectAnswers] = useState<string[]>([]) // 過去の正解回答を保持

	// 合計正解数を監視し、条件を満たしたらリザルト画面に遷移
	useEffect(() => {
		const totalCorrectAnswers = playerRecords.reduce(
			(sum, record) => sum + record.correctAnswers,
			0,
		)

		if (totalCorrectAnswers >= targetCorrectAnswers) {
			onGameEnd({
				playerRecords,
				totalCorrectAnswers,
				timeElapsed: time,
			})
		}
	}, [playerRecords, targetCorrectAnswers, time, onGameEnd])

	const handleClick = () => {
		// 回答フォームが未入力の場合は何もしない
		if (!answer.trim()) {
			setNotification("回答を入力してください。")
			return
		}

		const normalizedAnswer = answer.toLowerCase()

		// 回答数をカウント
		setPlayerRecords((prev) => {
			const updatedRecords = [...prev]
			updatedRecords[currentPlayer] = {
				...updatedRecords[currentPlayer],
				answers: [...updatedRecords[currentPlayer].answers, normalizedAnswer],
			}
			return updatedRecords
		})

		if (usedAnswers.includes(normalizedAnswer)) {
			setNotification("既に回答されています。再度回答を入力してください。")
			setAnswer("") // フォームをクリア
			return
		}

		const isCorrect = question.some((item) =>
			item.answer.includes(normalizedAnswer),
		)
		if (isCorrect) {
			setUsedAnswers((prev) => [...prev, normalizedAnswer])
			setPlayerRecords((prev) => {
				const updatedRecords = [...prev]
				updatedRecords[currentPlayer] = {
					...updatedRecords[currentPlayer],
					correctAnswers: updatedRecords[currentPlayer].correctAnswers + 1,
				}
				return updatedRecords
			})

			// 正解回答を追加し、アニメーションをトリガー
			setCorrectAnswers((prev) => [...prev, normalizedAnswer])

			setCurrentPlayer((prev) => (prev + 1) % 2)
			setNotification("")
			setIsModalOpen(true)
			setAnswer("") // 正解時もフォームをクリア
		} else {
			setNotification("不正解です。再度回答を入力してください。")
			setAnswer("") // フォームをクリア
		}
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
				<DialogContent className="bg-gray-100 text-black rounded-lg shadow-lg p-6">
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold text-center">
							{playerRecords[currentPlayer].name}さんのターン
						</DialogTitle>
					</DialogHeader>
					<div className="flex justify-center mt-6">
						<Button variant="secondary" onClick={() => setIsModalOpen(false)}>
							OK
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			<div className="border-2 border-gray-300 rounded p-4 bg-gray-50 shadow-md w-1/2 mx-auto mt-5">
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
						現在のターン: {playerRecords[currentPlayer].name}さん
					</p>
				</div>
				<div>
					<p className="text-center text-red-500 mt-3">{notification}</p>
				</div>
			</div>

			{/* 正解回答の表示 */}
			<div className="border-2 border-gray-300 rounded p-4 bg-white shadow-md w-3/4 max-w-130 mx-auto mb-5">
				<h2 className="text-xl font-bold mb-4">既出回答</h2>
				<div className="flex flex-wrap gap-2">
					{correctAnswers.map((answer, index) => (
						<div
							key={index}
							className="bg-green-200 text-green-800 px-4 py-2 rounded-full shadow-md animate-bounce"
						>
							{answer}
						</div>
					))}
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
