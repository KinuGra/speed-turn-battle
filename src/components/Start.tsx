"use client"

import { PlayerSaveForm } from "@/components/PlayerForm"
import SettingsModal from "@/components/SettingsModal"
import { Button } from "@/components/shared/ui/button"
import { useState } from "react"

export default function Start() {
	const [targetCorrectAnswers, setTargetCorrectAnswers] = useState(2) // 設定画面の何問正解すればリザルト画面に遷移するかはここでデフォルト値を設定

	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
			<h1 className="text-4xl font-bold mb-4">Speed Turn Battle</h1>
			<p className="text-lg mb-6">
				クイズを始めるにはプレイヤー名を入力し、スタートボタンをクリックしてください
			</p>

			<div className="absolute top-4 right-4">
				<SettingsModal
					targetCorrectAnswers={targetCorrectAnswers}
					onSave={setTargetCorrectAnswers}
				/>
			</div>

			<PlayerSaveForm targetCorrectAnswers={targetCorrectAnswers}>
				<Button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
					START
				</Button>
			</PlayerSaveForm>
		</main>
	)
}
