"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import CountUp from "react-countup"

export default function Result() {
	const searchParams = useSearchParams()
	const playerRecords: { name: string; correctAnswers: number; answers: string[] }[] = JSON.parse(searchParams.get("playerRecords") || "[]")
	const totalCorrectAnswers = Number.parseInt(
		searchParams.get("totalCorrectAnswers") || "0",
		10,
	)
	const totalAttempts = playerRecords.reduce(
		(sum: number, record: { answers: string[] }) => sum + record.answers.length,
		0,
	) // 回答数を計算
	const timeElapsed = searchParams.get("timeElapsed") || "0"
	const targetCorrectAnswers = searchParams.get("targetCorrectAnswers") || "0"
	const score = Number.parseInt(searchParams.get("score") || "0", 10) // スコアを取得

	const [showConfetti, setShowConfetti] = useState(false)

	useEffect(() => {
		setShowConfetti(true)
		const timer = setTimeout(() => setShowConfetti(false), 4000)
		return () => clearTimeout(timer)
	}, [])

	return (
		<div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 relative overflow-hidden">
			{showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={300} recycle={false} />}
			<div className="z-10 w-full flex flex-col items-center">
				<h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 drop-shadow-lg animate-bounce">🎉 リザルト 🎉</h1>
				<div className="flex flex-col gap-4 mb-8 w-full max-w-md">
					<div className="rounded-xl bg-white/80 shadow-xl p-6 flex flex-col items-center border-2 border-yellow-300">
						<p className="text-lg font-semibold mb-2 text-gray-700">スコア</p>
						<p className="text-3xl font-bold text-yellow-500 drop-shadow-sm">
							<CountUp end={score} duration={1.5} />
						</p>
					</div>
					<div className="rounded-xl bg-white/80 shadow-xl p-6 flex flex-col items-center border-2 border-pink-300">
						<p className="text-lg font-semibold mb-2 text-gray-700">目標正解数</p>
						<p className="text-2xl font-bold text-pink-500">
							<CountUp end={Number(targetCorrectAnswers)} duration={1.2} />
						</p>
					</div>
					<div className="rounded-xl bg-white/80 shadow-xl p-6 flex flex-col items-center border-2 border-blue-300">
						<p className="text-lg font-semibold mb-2 text-gray-700">合計正解数</p>
						<p className="text-2xl font-bold text-blue-500">
							<CountUp end={totalCorrectAnswers} duration={1.2} /> / <CountUp end={totalAttempts} duration={1.2} />
						</p>
					</div>
					<div className="rounded-xl bg-white/80 shadow-xl p-6 flex flex-col items-center border-2 border-green-300">
						<p className="text-lg font-semibold mb-2 text-gray-700">経過時間</p>
						<p className="text-2xl font-bold text-green-500">
							<CountUp end={Number(timeElapsed)} duration={1.2} />秒
						</p>
					</div>
				</div>
				<div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
					{playerRecords.map((record: any, index: number) => (
						<div key={index} className="bg-white/90 rounded-2xl shadow-lg p-5 border-2 border-indigo-200 flex flex-col items-center">
							<h2 className="text-xl font-bold text-indigo-600 mb-2">{record.name}</h2>
							<p className="text-base text-gray-700">正解数: <span className="font-bold text-green-600">{record.correctAnswers}</span></p>
							<p className="text-base text-gray-700">回答数: <span className="font-bold">{record.answers.length}</span></p>
							<p className="text-sm text-gray-500 break-words">回答: {record.answers.join(", ")}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
