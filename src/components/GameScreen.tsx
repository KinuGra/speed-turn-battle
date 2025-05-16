"use client"
import { useRouter } from "next/navigation" // ルーターをインポート
import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import CountUp from "react-countup"
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
	onGameEnd: (resultData: any, score: number) => void // スコアを追加
}

const GameScreen = ({
	player1,
	player2,
	targetCorrectAnswers,
	onGameEnd,
}: GameScreenProps) => {
	const router = useRouter() // ルーターを初期化
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
	const [turnStartTime, setTurnStartTime] = useState(Date.now()) // ターン開始時の時間を保持
	const [score, setScore] = useState(0) // スコア
	const [showConfetti, setShowConfetti] = useState(false)

	// 合計正解数を監視し、条件を満たしたらリザルト画面に遷移
	useEffect(() => {
		const totalCorrectAnswers = playerRecords.reduce(
			(sum, record) => sum + record.correctAnswers,
			0,
		)

		if (totalCorrectAnswers >= targetCorrectAnswers) {
			setIsModalOpen(false)
			router.push(
				`/Result?playerRecords=${encodeURIComponent(
					JSON.stringify(playerRecords),
				)}&totalCorrectAnswers=${totalCorrectAnswers}&timeElapsed=${time}&score=${score}&targetCorrectAnswers=${targetCorrectAnswers}`,
			) // クエリパラメータにスコアを含める
		}
	}, [playerRecords, targetCorrectAnswers, time, score, router])

	useEffect(() => {
		// ゲーム開始時にモーダルを開く
		setIsModalOpen(true)
	}, [])

	useEffect(() => {
		if (score > 0) {
			setShowConfetti(true)
			const timer = setTimeout(() => setShowConfetti(false), 2000)
			return () => clearTimeout(timer)
		}
	}, [score])

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
			setScore((pre) => pre - 50) //スコアを減少
			setAnswer("") // フォームをクリア
			return
		}

		const isCorrect = question.some((item) =>
			item.answer.includes(normalizedAnswer),
		)
		if (isCorrect) {
			// 終了時の時間を取得
			const endTime = Date.now()
			const elapsedTime = (endTime - turnStartTime) / 1000

			const baseScore = 3000 // 基本スコア
			const timeBonus = Math.floor(baseScore / elapsedTime) // 経過時間に基づくボーナス
			const TimeScore = Math.min(timeBonus, 9999) // 加算するスコアの上限を9999に設定

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
			setScore((pre) => pre + TimeScore + 500) // スコアの加算処理
			setAnswer("") // 正解時もフォームをクリア
		} else {
			setNotification("不正解です。再度回答を入力してください。")
			setScore((pre) => pre - 100) //スコアを減少
			setAnswer("") // フォームをクリア
		}
	}

	const handleModalClose = () => {
		setIsModalOpen(false)
		setTurnStartTime(Date.now()) // ターン開始時の時間を更新
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
		<div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 relative overflow-hidden">
			{showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={180} recycle={false} />}
			<div className="flex-1 flex flex-col justify-between overflow-y-auto">
				{/* モーダル */}
				<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
					<DialogContent className="bg-white/90 text-black rounded-2xl shadow-2xl p-8 border-4 border-yellow-200">
						<DialogHeader>
							<DialogTitle className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 drop-shadow-lg animate-bounce">
								{playerRecords[currentPlayer].name}さんのターン
							</DialogTitle>
						</DialogHeader>
						<div className="flex justify-center mt-6">
							<Button variant="secondary" onClick={handleModalClose} className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400 text-white font-bold shadow-md hover:scale-105 transition-transform">
								OK
							</Button>
						</div>
					</DialogContent>
				</Dialog>

				<div className="border-4 border-yellow-200 rounded-2xl p-6 bg-white/80 shadow-xl w-11/12 md:w-3/5 mx-auto mt-8">
					<div className="flex flex-col justify-center items-center">
						<h1 className="text-center font-extrabold text-2xl md:text-3xl text-indigo-700 mb-2">問題</h1>
					</div>
					<div>
						{question.map((item) => (
							<div
								key={item.id}
								className="flex flex-col justify-center items-center mt-5"
							>
								<h2 className="text-center font-bold text-xl md:text-2xl text-pink-600">
									{item.question}
								</h2>
							</div>
						))}
					</div>
					<div>
						<p className="text-center font-bold mt-3 text-blue-600">経過時間：{time}秒</p>
					</div>
					<div>
						<p className="text-center font-bold mt-3 text-indigo-700">
							現在のターン: {playerRecords[currentPlayer].name}さん
						</p>
					</div>
					<div>
						<p className="text-center text-red-500 mt-3 font-semibold">{notification}</p>
					</div>
				</div>

				{/* スコア表示 */}
				<div className="border-4 border-pink-200 rounded-2xl p-4 bg-white/90 shadow-lg w-11/12 md:w-2/5 max-w-2xl mx-auto mb-2 mt-4 flex flex-col items-center">
					<div className="flex justify-center items-center gap-4">
						<div className="text-xl font-bold text-yellow-600">Score:</div>
						<div className="text-3xl font-extrabold text-pink-500 drop-shadow-sm">
							<CountUp end={score} duration={1.2} />
						</div>
					</div>
				</div>

				{/* 正解回答の表示 */}
				<div className="border-4 border-blue-200 rounded-2xl p-4 bg-white/90 shadow-lg w-11/12 md:w-3/5 max-w-3xl mx-auto mb-5">
					<h2 className="text-xl font-bold mb-4 text-green-700">既出回答</h2>
					<div className="flex flex-wrap gap-2">
						{correctAnswers.map((answer) => (
							<div
								key={answer}
								className="bg-green-200 text-green-800 px-4 py-2 rounded-full shadow-md animate-bounce"
							>
								{answer}
							</div>
						))}
					</div>
				</div>

				<div className="border-4 border-indigo-200 rounded-2xl p-4 bg-white/90 shadow-lg w-11/12 md:w-3/5 max-w-3xl mx-auto mb-8">
					<div className="flex flex-col gap-4">
						<div className="flex gap-2 items-center max-w-md w-full mx-auto">
							<input
								id="answer"
								type="text"
								autoComplete="off"
								value={answer}
								onChange={(e) => setAnswer(e.target.value)}
								placeholder="ここに回答を入力"
								className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full text-lg"
							/>
							<Button type="button" onClick={handleClick} className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400 text-white font-bold shadow-md hover:scale-105 transition-transform">
								回答
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GameScreen
