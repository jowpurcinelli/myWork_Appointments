import React, { useContext } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';

import { Container } from './styles';

interface Props {
    toggleTheme( ): void
}

const ThemeSwitcher : React.FC<Props> = ({ toggleTheme }) => {
    const { colors, title } = useContext(ThemeContext)

    return (
        <Container>
            <Switch
                onChange = { toggleTheme }
                checkedIcon = { false }
                uncheckedIcon = { false }
                checked = { title === 'dark' }
                width = { 40 }
                height = { 10 }
                handleDiameter = { 20 }
                offColor = { colors.secundary }
                onColor = { colors.text }
                offHandleColor = { colors.secundary }
                onHandleColor = { colors.text }

            />
        </Container>
    )
}

export default ThemeSwitcher;
