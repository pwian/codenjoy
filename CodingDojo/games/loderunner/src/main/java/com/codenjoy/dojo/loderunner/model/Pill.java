package com.codenjoy.dojo.loderunner.model;

/*-
 * #%L
 * Codenjoy - it's a dojo-like platform from developers to developers.
 * %%
 * Copyright (C) 2018 - 2019 Codenjoy
 * %%
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public
 * License along with this program.  If not, see
 * <http://www.gnu.org/licenses/gpl-3.0.html>.
 * #L%
 */

import com.codenjoy.dojo.services.Point;
import com.codenjoy.dojo.services.PointImpl;
import com.codenjoy.dojo.services.State;

public class Pill extends PointImpl implements State<Elements, Player> {

  private PillType pillType;

  public Pill(Point point, PillType pillType) {
    super(point);
    this.pillType = pillType;
  }

  public Pill(int x, int y, PillType pillType) {
    super(x, y);
    this.pillType = pillType;
  }

  @Override
  public Elements state(Player player, Object... alsoAtPoint) {
    return Elements.THE_KILLER_PILL;
  }

  enum PillType {
    THE_KILLER_PILL,
    SPEED_PILL
  }
}
