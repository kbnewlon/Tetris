import { useCallback, useState } from 'react';
import { checkCollision, STAGE_WIDTH } from '../gameHelpers';
import { TETROMINOS, randomTetromino } from '../tetrominos';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const rotate = (matrix, dir)=>{
      // rows to columns
      const rotateTetro = matrix.map((_, index) => matrix.map(col => col[index]),
      )
      // reverse row to get a rotated matrix
      if(dir > 0) return rotateTetro.map(row => row.reverse())
      return rotateTetro.reverse()
    }

    const playerRotate = (stage, dir) => {
      // mutates player as to not mess with the state
      const clonedPlayer = JSON.parse(JSON.stringify(player))
      clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir)

      //keeps tetro from rotating outside the stage
      const pos = clonedPlayer.pos.x;
      let offset = 1;
      while(checkCollision(clonedPlayer, stage, {x: 0, y: 0})){
        
      }

      setPlayer(clonedPlayer)
    }



    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
          ...prev,
          pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
          collided,
        }));
      };
    
      const resetPlayer = useCallback(() => {
        setPlayer({
          pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
          tetromino: randomTetromino().shape,
          collided: false,
        });
      }, []);

    return[player, updatePlayerPos, resetPlayer, playerRotate];
}