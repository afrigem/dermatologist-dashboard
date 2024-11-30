import * as React from 'react';
import Image from 'next/image';
import {
  AppBar, Box, Toolbar, IconButton, Typography,
  Menu, Container, Avatar, Tooltip, MenuItem, useMediaQuery
} from '@mui/material';
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import ThemeToggleButton from '../ThemeToggleButton';
import { useTheme } from '@mui/system';

export type HeaderProps = {
  ColorModeContext: React.Context<{ toggleColorMode: () => void }>,
};

const Header = ({ ColorModeContext }: HeaderProps) => {
  const { data: session } = useSession();
  const theme = useTheme();
  const tabletCheck = useMediaQuery('(min-width: 768px)');
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const userName = session?.user?.name || "Guest";
  const userImage = session?.user?.image || "/default-avatar.png";

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Image 
              src="/afrigem-logo.png" 
              alt="Afrigem Logo" 
              width={40} 
              height={40} 
              priority 
            />
          </Box>
          {/* Branding */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'default',
              fontWeight: 700,
              letterSpacing: '0rem',
              color: '#FFB6C1', // Pastel Pink
              textDecoration: 'none',
            }}
          >
            Afrigem
          </Typography>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <Image 
              src="/afrigem-logo.png" 
              alt="Afrigem Logo" 
              width={30} 
              height={30} 
              priority 
            />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'default',
              fontWeight: 700,
              letterSpacing: '0rem',
              color: '#FFB6C1', // Pastel Pink
              textDecoration: 'none',
            }}
          >
            Afrigem
          </Typography>

          {/* User Email on Larger Screens */}
          {tabletCheck && (
            <Box sx={{ ml: 'auto', pr: 5 }}>
              <Typography>Signed in as {session?.user?.email}</Typography>
            </Box>
          )}

          {/* Theme Toggle Button */}
          <ThemeToggleButton ColorModeContext={ColorModeContext} />

          {/* User Avatar and Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Profile Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} aria-label="Open user menu">
                <Avatar alt={userName} src={userImage} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <NextLink
                  href="/dashboard/profile"
                  style={{ color: theme.palette.text.primary, textDecoration: 'none' }}
                >
                  <Typography textAlign="center">Profile</Typography>
                </NextLink>
              </MenuItem>
              <MenuItem onClick={() => (session ? signOut() : signIn())}>
                <Typography textAlign="center">{session ? 'Logout' : 'Login'}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
