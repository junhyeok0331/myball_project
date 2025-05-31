import React, { createContext, useContext, useState, useEffect } from 'react';

const PointContext = createContext();

export const PointProvider = ({ children }) => {
  // 로컬스토리지에서 포인트 읽기, 없으면 200으로 초기화
  const [point, setPoint] = useState(() => {
    const savedPoint = localStorage.getItem('userPoint');
    return savedPoint ? Number(savedPoint) : 200;
  });

  // point 값이 변할 때마다 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('userPoint', point);
  }, [point]);

  const spendPoint = (amount) => {
    if (point >= amount) {
      setPoint(point - amount);
      return true;
    }
    return false;
  };

  const addPoint = (amount) => {
    setPoint(point + amount);
  };

  return (
    <PointContext.Provider value={{ point, spendPoint, addPoint }}>
      {children}
    </PointContext.Provider>
  );
};

export const usePoint = () => useContext(PointContext);
