import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { Select } from '../select';
import { Text } from '../text';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	defaultOptions: ArticleStateType;
	applyOptions: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	defaultOptions,
	applyOptions,
}: ArticleParamsFormProps) => {
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
	const [selectedOptions, setSelectedOptions] =
		useState<ArticleStateType>(defaultOptions);
	const rootRef = useRef<HTMLDivElement | null>(null);

	const toggleSideMenu = () => {
		setIsSideMenuOpen(!isSideMenuOpen);
	};

	useOutsideClickClose({
		isOpen: isSideMenuOpen,
		rootRef,
		onChange: setIsSideMenuOpen,
	});

	const handleSubmitSideMenu = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		applyOptions(selectedOptions);
	};

	const handleResetSideMenu = () => {
		setSelectedOptions(defaultArticleState);
		applyOptions(defaultArticleState);
	};

	function handleOptionsChange(
		optionKey: keyof ArticleStateType,
		value: OptionType
	) {
		setSelectedOptions((prevOption) => ({
			...prevOption,
			[optionKey]: value,
		}));
	}

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={toggleSideMenu} isSideMenuOpen={isSideMenuOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSideMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmitSideMenu}
					onReset={handleResetSideMenu}>
					<Text weight={800} size={31} uppercase align='left'>
						Задайте параметры
					</Text>

					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={selectedOptions.fontFamilyOption}
						onChange={(value) => handleOptionsChange('fontFamilyOption', value)}
					/>

					<RadioGroup
						title='размер шрифта'
						name='размер шрифта'
						options={fontSizeOptions}
						selected={selectedOptions.fontSizeOption}
						onChange={(value) => handleOptionsChange('fontSizeOption', value)}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={selectedOptions.fontColor}
						onChange={(value) => handleOptionsChange('fontColor', value)}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={selectedOptions.backgroundColor}
						onChange={(value) => handleOptionsChange('backgroundColor', value)}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={selectedOptions.contentWidth}
						onChange={(value) => handleOptionsChange('contentWidth', value)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
