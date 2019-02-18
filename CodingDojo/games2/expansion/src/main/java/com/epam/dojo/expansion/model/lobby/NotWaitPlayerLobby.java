package com.epam.dojo.expansion.model.lobby;

/*-
 * #%L
 * expansion - it's a dojo-like platform from developers to developers.
 * %%
 * Copyright (C) 2016 - 2017 EPAM
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


import com.epam.dojo.expansion.model.GameFactory;
import com.epam.dojo.expansion.model.Player;
import com.epam.dojo.expansion.model.PlayerBoard;

import java.util.LinkedList;
import java.util.List;
import java.util.function.Supplier;

/**
 * Created by Oleksandr_Baglai on 2017-09-11.
 */
public class NotWaitPlayerLobby implements PlayerLobby {

    protected GameFactory factory;

    public NotWaitPlayerLobby(GameFactory factory) {
        this.factory = factory;
    }

    @Override
    public void saveStateTo(PlayerLobby lobby) {
        // no state - do nothing
    }

    @Override
    public void remove(Player player) {
        // do nothing
    }

    @Override
    public void addPlayer(Player player) {
        // do nothing
    }

    @Override
    public PlayerBoard start(Player player) {
        PlayerBoard result = factory.existMultiple();
        if (result == null) {
            result = factory.newMultiple();
        }
        return result;
    }

    @Override
    public void tick() {
        // do nothing
    }
}