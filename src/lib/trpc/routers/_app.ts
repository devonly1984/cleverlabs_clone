
import {  createTRPCRouter } from '../init';
import { generationRouter } from './generations';
import { voicesRouter } from './voices';
export const appRouter = createTRPCRouter({
 voices: voicesRouter,
 generations: generationRouter
});

export type AppRouter = typeof appRouter;