import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';

export function Progress(props: { action: string; color?: string; loading: boolean; details?: string }) {
  const { action, color, loading, details } = props;

  return (
    <>
      <Text>
        {loading ? <Spinner /> : <Text color="green">✔</Text>}
        <Text> </Text>
        <Text bold color={color}>
          {action}
        </Text>
      </Text>

      {details ? (
        <Box minHeight={8}>
          {details
            .split('\n')
            .slice(-8)
            .map((line, index) => (
              <Text key={index}>
                {line}
                {'\n'}
              </Text>
            ))}
        </Box>
      ) : null}
    </>
  );
}
