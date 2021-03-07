/**
 * {% if style == "oo" %}
 *  // Talk about OO factory methods
 * {% elsif style == "fp" %}
 *  // Talk about pure function returned
 * {% endif %}
 * Returns an update function that uses a priority queue to schedule turn
 * order. Each entity must provide an `actionDelay` value that tells the
 * scheduler how long until their next action. Each action consumes the delay,
 * and propagates it to the schedule, so entities are interleaved based on their
 * defined speed.
 *
 * @return {[userDefinedType]} [Explain how to generate custom game result types]
 */
function priorityTurnUpdate(entities, items, effects) {
  const schedule = new PriorityQueue();
  // {% if style == "oo" %}
  // TODO: configure(UpdateClass.prototype)
  // return UpdateClass
  // {% else %}
  // initializeState()
  // {% endif %}
  return tick() {
    while (true) {
      // Break if we are waiting on player input
      if (schedule.peek().needsInput()) break;

      // Get the next entity its priority
      const [entity, delay] = pq.pollIndex();

      // Adjust passage of time by consuming the delay across all scheduled
      // entities
      schedule.adjustBy(-delay);

      // Change this to match the calling convention of your turn-based engine
      // or ECS framework
      entity.nextAction();

      // TODO: configure nextAction() to return a result rather than internal state
      // This should be switchable as an engine preset:
      // {% if style == "fp" %}
      // const actionResult = entity.nextAction();
      // {% else %}
      // entity.nextAction();
      // {% endif %}

      // `actionDelay` needs to be provided on the entity,
      // this specifies the block of time
      schedule.push(entity, entity.actionDelay());
    }
  }
}
