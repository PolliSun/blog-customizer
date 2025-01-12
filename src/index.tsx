import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [selectedOptions, setSelectedOptions] =
		useState<ArticleStateType>(defaultArticleState);
	const newArticleStateType = (data: ArticleStateType) => {
		setSelectedOptions(data);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': selectedOptions.fontFamilyOption.value,
					'--font-size': selectedOptions.fontSizeOption.value,
					'--font-color': selectedOptions.fontColor.value,
					'--container-width': selectedOptions.contentWidth.value,
					'--bg-color': selectedOptions.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				defaultOptions={defaultArticleState}
				applyOptions={newArticleStateType}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
