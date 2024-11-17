'use client';

import { GameBoard, GameStats, StartGameBtn } from '@/components';
import React from 'react';

export default function GamePage() {
	return (
		<div className='min-h-screen flex justify-center items-center bg-neutral1 text-accent'>
			<div>
				<GameStats />
				<GameBoard />
				<StartGameBtn />
			</div>
		</div>
	);
}
