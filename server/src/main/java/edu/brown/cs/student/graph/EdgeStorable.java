package edu.brown.cs.student.graph;

/**
 * An interface for Objects to be stored in a {@link ValuedEdge}.
 */
public interface EdgeStorable {
  /**
   * Acquires the weight a {@link ValuedEdge} would output if it contained this EdgeStorable.
   *
   * @return a weight
   */
  double getWeight();
}
