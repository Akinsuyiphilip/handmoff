import { RiArrowLeftSLine, RiArrowRightLine } from "@remixicon/react"
import React from "react"

import { Button } from "../ui/button"

interface Props {
	current: number
	onPageChange: (page: number) => void
	pageSize: number
	total: number
}

export const Pagination = ({
	current,
	onPageChange,
	pageSize,
	total,
}: Props) => {
	const totalPages = Math.ceil(total / pageSize)

	const previousPage = () => {
		if (current > 1) {
			onPageChange(current - 1)
		}
	}

	const nextPage = () => {
		if (current < totalPages) {
			onPageChange(current + 1)
		}
	}

	const renderButtons = () => {
		let numbers = []
		for (let index = 1; index <= totalPages; index++) {
			numbers.push(
				<button
					key={index}
					onClick={() => onPageChange(index)}
					className={`grid size-8 place-items-center rounded-full text-sm ${current === index ? "bg-black text-white" : ""}`}>
					{index}
				</button>
			)
		}
		return numbers
	}

	return (
		<div className="flex w-full items-center justify-center gap-5">
			<Button onClick={previousPage} size="sm" disabled={current === 1}>
				<RiArrowLeftSLine />
			</Button>
			<div className="flex items-center gap-3">{renderButtons()}</div>
			<Button onClick={nextPage} size="sm" disabled={current === totalPages}>
				<RiArrowRightLine />
			</Button>
		</div>
	)
}
