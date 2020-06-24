/**
 * @Summary: short description for the file
 * @Date: 2020/6/17 10:58 AM
 * @Author: Youth
 */
import React from 'react';
import { MobXProviderContext } from 'mobx-react';

export function useStores() {
  return React.useContext(MobXProviderContext);
}