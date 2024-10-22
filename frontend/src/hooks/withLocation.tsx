import React from 'react';
import { useLocation } from 'react-router-dom';

// HOC, который передает значение useLocation как пропс в оборачиваемый компонент
function withLocation<T>(Component: React.ComponentType<T & { location: ReturnType<typeof useLocation> }>) {
  return (props: T) => {
    const location = useLocation(); // Получаем текущий маршрут через хук useLocation
    return <Component {...props} location={location} />;
  };
}

export default withLocation;
