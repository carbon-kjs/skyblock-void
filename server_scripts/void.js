EntityEvents.hurt((event) => {
  const { entity, source } = event;

  if (entity.isPlayer()) {
    if (entity.persistentData.fromVoid && source == "DamageSource (fall)") {
      entity.persistentData.fromVoid = false;
      event.cancel();
    } else if (source == "DamageSource (outOfWorld)" && entity.y < -64) {
      entity.persistentData.fromVoid = true;
      if (!entity.stages.has("void")) {
        event.server.runCommandSilent(
          `execute in ${event.level.dimension} run tp ${
            entity.username
          } ${Math.floor(entity.x)} 256 ${Math.floor(entity.z)}`
        );
        entity.addMotion(0, -10, 0);
        entity.stages.add("void");
      }
      event.cancel();
      entity.stages.remove("void");
    }
  }
});
