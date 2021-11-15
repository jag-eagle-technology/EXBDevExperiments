import {ImmutableObject} from 'jimu-core';

export interface Config{
  printUrl: string;
}

export type IMConfig = ImmutableObject<Config>;