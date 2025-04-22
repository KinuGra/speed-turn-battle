"use client"

import { useSearchParams } from "next/navigation"

export default function Result() {
	const searchParams = useSearchParams()
	const playerRecords = JSON.parse(searchParams.get("playerRecords") || "[]")
	const totalCorrectAnswers = parseInt(searchParams.get("totalCorrectAnswers") || "0", 10)
	const totalAttempts = playerRecords.reduce(
		(sum, record) => sum + record.answers.length,
		0,
	) // 回答数を計算
	const timeElapsed = searchParams.get("timeElapsed") || "0"
	const targetCorrectAnswers = searchParams.get("targetCorrectAnswers") || "0"

	return (
		<div className="h-screen flex flex-col items-center justify-center bg-gray-100">
			<h1 className="text-3xl font-bold mb-6">リザルト</h1>
			<p className="text-lg mb-4">目標正解数: {targetCorrectAnswers}</p>
			<p className="text-lg mb-4">
				合計正解数: {totalCorrectAnswers} / {totalAttempts}
			</p>
			<p className="text-lg mb-4">経過時間: {timeElapsed}秒</p>
			<div className="w-3/4 max-w-lg bg-white rounded-lg shadow-md p-6">
				{playerRecords.map((record: any, index: number) => (
					<div key={index} className="mb-4">
						<h2 className="text-xl font-bold">{record.name}</h2>
						<p>正解数: {record.correctAnswers}</p>
						<p>回答数: {record.answers.length}</p>
						<p>回答: {record.answers.join(", ")}</p>
					</div>
				))}
			</div>
		</div>
	)
}
