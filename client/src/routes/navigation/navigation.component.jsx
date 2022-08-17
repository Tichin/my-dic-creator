import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './navigation.styles.scss';

export default function Navigation() {
  return (
    <div>
      Navigation
      <Outlet />
    </div>
  );
}
