declare module '@mui/material/Unstable_Grid2' {
    import { OverridableComponent, OverridableTypeMap } from '@mui/material/OverridableComponent';
    import { BoxProps } from '@mui/system';
    
    interface Grid2TypeMap<P = {}, D extends React.ElementType = 'div'> extends OverridableTypeMap {
      props: P & BoxProps;
      defaultComponent: D;
    }
  
    const Grid2: OverridableComponent<Grid2TypeMap>;
    export default Grid2;
  }
  