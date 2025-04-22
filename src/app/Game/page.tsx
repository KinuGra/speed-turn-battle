"use client"

import GameScreen from "@/components/GameScreen"
import { useSearchParams } from "next/navigation"

export default function Game() {
	const searchParams = useSearchParams()
	const player1 = searchParams.get("player1") || "プレイヤー1"
	const player2 = searchParams.get("player2") || "プレイヤー2"

	return (
		<div>
			<GameScreen player1={player1} player2={player2} />
		</div>
	)
}
