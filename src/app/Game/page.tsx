"use client"

import GameScreen from "@/components/GameScreen"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

export default function Game() {
	return (
		<Suspense>
			<GameContent />
		</Suspense>
	)
}

function GameContent() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const player1 = searchParams.get("player1") || "プレイヤー1"
	const player2 = searchParams.get("player2") || "プレイヤー2"
	const targetCorrectAnswers = Number.parseInt(
		searchParams.get("targetCorrectAnswers") || "10",
		10,
	) // クエリから取得

	const handleGameEnd = (resultData: any) => {
		const query = new URLSearchParams({
			playerRecords: JSON.stringify(resultData.playerRecords),
			totalCorrectAnswers: resultData.totalCorrectAnswers.toString(),
			timeElapsed: resultData.timeElapsed.toString(),
			targetCorrectAnswers: targetCorrectAnswers.toString(),
		}).toString()

		router.push(`/Result?${query}`)
	}

	return (
		<div>
			<GameScreen
				player1={player1}
				player2={player2}
				targetCorrectAnswers={targetCorrectAnswers} // クエリから取得した値を渡す
				onGameEnd={handleGameEnd}
			/>
		</div>
	)
}
