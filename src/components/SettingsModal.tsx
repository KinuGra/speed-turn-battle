"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./shared/ui/dialog"
import { Button } from "./shared/ui/button"

interface SettingsModalProps {
	targetCorrectAnswers: number
	onSave: (value: number) => void
}

const SettingsModal = ({ targetCorrectAnswers, onSave }: SettingsModalProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [newTarget, setNewTarget] = useState(targetCorrectAnswers)

	const handleSave = () => {
		onSave(newTarget)
		setIsOpen(false)
	}

	return (
		<>
			<Button variant="ghost" onClick={() => setIsOpen(true)}>
				⚙️
			</Button>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="bg-white rounded-lg shadow-lg p-6">
					<DialogHeader>
						<DialogTitle className="text-xl font-bold">設定</DialogTitle>
					</DialogHeader>
					<div className="mt-4">
						<label className="block text-sm font-medium text-gray-700">
							目標正解数
						</label>
						<input
							type="number"
							value={newTarget}
							onChange={(e) => setNewTarget(Number(e.target.value))}
							className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						/>
					</div>
					<div className="flex justify-end mt-6">
						<Button variant="secondary" onClick={() => setIsOpen(false)}>
							キャンセル
						</Button>
						<Button className="ml-2" onClick={handleSave}>
							保存
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default SettingsModal
