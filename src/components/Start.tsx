"use client"

import { PlayerSaveForm } from "@/components/PlayerForm"
import SettingsModal from "@/components/SettingsModal"
import { Button } from "@/components/shared/ui/button"
import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import CountUp from "react-countup"

export default function Start() {
	const [targetCorrectAnswers, setTargetCorrectAnswers] = useState(2) // 設定画面の何問正解すればリザルト画面に遷移するかはここでデフォルト値を設定
	const [showConfetti, setShowConfetti] = useState(false)

	useEffect(() => {
		setShowConfetti(true)
		const timer = setTimeout(() => setShowConfetti(false), 3000)
		return () => clearTimeout(timer)
	}, [])

	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 text-gray-900 dark:text-gray-100 relative overflow-hidden">
			{showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={200} recycle={false} />}
			<h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 drop-shadow-lg animate-bounce">Speed Turn Battle</h1>
			<p className="text-lg mb-8 text-gray-700 dark:text-gray-200 shadow-sm bg-white/70 rounded-xl px-6 py-3">
				2人のプレイヤーが交互に回答するスピードを競います！
			</p>
			<div className="absolute top-4 right-4">
				<SettingsModal
					targetCorrectAnswers={targetCorrectAnswers}
					onSave={setTargetCorrectAnswers}
				/>
			</div>
			<PlayerSaveForm targetCorrectAnswers={targetCorrectAnswers}>
				<Button className="px-8 py-4 bg-gradient-to-r from-blue-500 via-pink-400 to-yellow-400 text-white text-xl rounded-full shadow-lg hover:scale-105 transition-transform">
					START
				</Button>
			</PlayerSaveForm>
		</main>
	)
}
