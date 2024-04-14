
import { useColorMode, Button } from '@chakra-ui/react';

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
      {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
    </Button>
  );
}

export default ColorModeToggle;
