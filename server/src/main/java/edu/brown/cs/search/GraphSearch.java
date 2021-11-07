package main.java.edu.brown.cs.search;

import java.util.List;

import main.java.edu.brown.cs.graph.EdgeStorable;
import main.java.edu.brown.cs.graph.ValuedEdge;
import main.java.edu.brown.cs.graph.ValuedVertex;
import main.java.edu.brown.cs.graph.VertexStorable;

/**
 * An interface for main.java.edu.brown.cs.graph.graph search algorithms.
 * @param <T> Value contained in a vertex
 * @param <W> Value contained in a edge
 */
public interface GraphSearch<T extends VertexStorable, W extends EdgeStorable> {
  /**
   * Searches the main.java.edu.brown.cs.graph.graph.
   *
   * @param start a {@link ValuedVertex} to start from
   * @param query a value that the destination {@link ValuedVertex} should contain
   * @return a List of {@link ValuedEdge}s
   */
  List<ValuedEdge<T, W>> search(ValuedVertex<T, W> start, T query);
}
