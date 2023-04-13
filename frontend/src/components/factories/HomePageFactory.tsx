import type { UiButton, UiHero } from "../../strapi";

interface Props {
  blocks: (UiButton | UiHero | (UiButton & UiHero))[];
}

export const HomePageFactory: React.FC<Props> = ({ blocks }) => {
  console.log(blocks);
  if (!blocks || blocks.length < 1) {
    return <p>addbashj</p>;
  }
  return (
    <>
      {blocks.map((block) => {
        switch (block.__component) {
          case "ui.button":
            return <button key={block.id}>nasddjknask</button>;
          case "ui.hero":
            return <p key={block.id}>hero</p>;
          default:
            return <p key="default">ajdnaskjn</p>;
        }
      })}
    </>
  );
};
