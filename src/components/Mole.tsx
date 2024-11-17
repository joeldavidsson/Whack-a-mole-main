import React, {ComponentPropsWithoutRef} from 'react';

interface IProps extends ComponentPropsWithoutRef<'button'> {
  isActive?: boolean;
  isClicked?: boolean;
}

export const Mole = ({isActive = false, isClicked = false, ...props}: IProps) => {
  return (
    <button
      disabled={!isActive || isClicked}
      className={`flex justify-center items-center w-full max-w-32 aspect-square bg-[url("/summerGrassWithCatBed.png")] bg-cover bg-center rounded-lg custom-cursor`}
      {...props}
    >
      {(isActive || isClicked )  && (
        <img
          src={isClicked ? '/saperavipetted.png' : 'saperaviunpetted.png'}
          className='w-full h-full'
          draggable={false}
          alt=''
          onClick={() => {
            const audio = new Audio('/cat.mp3');
            audio.play();
          }}
        />
      )}
    </button>
  );
};

export default Mole;
