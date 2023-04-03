import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export const useAppDispatch: () => AppDispatch = useDispatch<TypedDispatch<RootState>>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;