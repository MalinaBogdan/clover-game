export default (entities, {screen}) => {
  let player = entities.player;
  let camera = entities.camera;

  // let anchorY = screen.height * 0.65;
  let anchorX = screen.width * 0.5;

  // let diffY = anchorY - player.body.position.y - camera.offsetY;
  let diffX = anchorX - player.body.position.x - camera.offsetX;

  // camera.offsetY += diffY * 0.05;
  camera.offsetX += diffX * 0.15;

  return entities;
};
