import {Add, Remove} from '@mui/icons-material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export type TPassengerType = 'adults' | 'children' | 'infants';

interface IPassengerRowProps {
  title: string;
  count: number;
  type: TPassengerType;

  subtitle?: string;
  minValue?: number;
  updatePassengerCount: (
    type: TPassengerType,
    operation: 'increment' | 'decrement',
  ) => void;
}

const PassengerRow = ({
  title,
  subtitle,
  count,
  type,
  updatePassengerCount,
  minValue = 0,
}: IPassengerRowProps) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      py: 2,
      px: 1,
    }}>
    <Box>
      <Typography variant="body1" sx={{fontWeight: 500, color: 'text.primary'}}>
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body2"
          sx={{color: 'text.secondary', fontSize: '0.75rem'}}>
          {subtitle}
        </Typography>
      )}
    </Box>

    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
      <IconButton
        size="small"
        onClick={() => updatePassengerCount(type, 'decrement')}
        disabled={count <= minValue}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          width: 32,
          height: 32,
          '&:disabled': {
            borderColor: 'action.disabled',
            color: 'action.disabled',
          },
        }}>
        <Remove fontSize="small" />
      </IconButton>

      <Typography
        variant="body1"
        sx={{
          minWidth: 24,
          textAlign: 'center',
          fontWeight: 500,
        }}>
        {count}
      </Typography>

      <IconButton
        size="small"
        onClick={() => updatePassengerCount(type, 'increment')}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          width: 32,
          height: 32,
          '&:hover': {
            borderColor: 'primary.main',
            color: 'primary.main',
          },
        }}>
        <Add fontSize="small" />
      </IconButton>
    </Box>
  </Box>
);

export default PassengerRow;
