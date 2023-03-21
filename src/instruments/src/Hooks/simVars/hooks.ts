/*
 *   Copyright (c) 2021 Synaptic Simulations and its contributors
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import { useEffect } from 'react';
import { toPrecision } from '@instruments/utils/mathUtils';
import { setSimVar, updateSimVar, SimVarReturnType, SimVarState, removeSimVar } from '@instruments/Hooks/redux/simVars';
import { useSimVarDispatch, useSimVarSelector } from '@instruments/Hooks/redux/store';
import { Units } from '@instruments/Hooks/simVars/units';

declare const SimVar: {
    GetSimVarValue: <T extends Units>(name: string, unit: T) => SimVarReturnType<T>;
    SetSimVarValue: <T extends Units>(name: string, unit: T, value: SimVarReturnType<T>) => void;
};

function useSimVarValue<T extends Units>(name: string, unit: T, decimals = 0): SimVarReturnType<T> {
    const dispatch = useSimVarDispatch();

    useEffect(() => {
        dispatch(updateSimVar([
            { name, unit, value: SimVar.GetSimVarValue(name, unit) },
        ]));

        return () => {
            dispatch(removeSimVar({ name, unit }));
        };
    }, [name, unit]);

    return useSimVarSelector((state: SimVarState) => {
        const value = state[`${name}/${unit}`] ?? SimVar.GetSimVarValue(name, unit);
        if (typeof value === 'number' && decimals !== undefined) return toPrecision(value, decimals);
        return value;
    });
}

function useSimVarSetter<T extends Units>(name: string, unit: T) {
    const dispatch = useSimVarDispatch();

    return (value: SimVarReturnType<T>) => dispatch(setSimVar({ name, unit, value }));
}

export function useSimVar<T extends Units>(name: string, unit: T, decimals?: number): [SimVarReturnType<T>, (value: SimVarReturnType<T>) => void] {
    const value = useSimVarValue(name, unit, decimals);
    const setter = useSimVarSetter(name, unit);

    return [value, setter];
}

export function useSplitSimVar<R extends Units, W extends Units>(
    readName: string,
    readUnit: R,
    writeName: string,
    writeUnit: W,
    decimals?: number,
): [SimVarReturnType<R>, (value: SimVarReturnType<W>) => void] {
    const value = useSimVarValue(readName, readUnit, decimals);
    const setter = useSimVarSetter(writeName, writeUnit);

    return [value, setter];
}
