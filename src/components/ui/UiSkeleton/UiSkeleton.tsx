import { useThemeContext } from '@/context/theme';
import { FC } from 'react';
import Skeleton, { SkeletonProps, SkeletonTheme } from 'react-loading-skeleton';

export type UiSkeletonProps = SkeletonProps;

export const UiSkeleton: FC<UiSkeletonProps> = ({ ...restProps }) => {
  const { theme } = useThemeContext();

  const baseColor = restProps.baseColor || theme.palette.skeleton.base;
  const highlightColor = restProps.highlightColor || theme.palette.skeleton.highlight;

  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <Skeleton {...restProps} />
    </SkeletonTheme>
  );
};
