import test, { describe } from 'node:test';
import assert from 'node:assert/strict';

import {
    fareForRide,
    totalFare,
    applyPeakSurcharge,
    waitingCharge,
    rideSummary,
    totalDistance
} from '../src/taxi.js';

// R1: fareForRide Tests
describe('R1 - fareForRide', () => {

    test('calculates fare for a normal ride', () => {
        // Arrange
        const distance = 10;
        const rate = 20;

        // Act
        const result = fareForRide(distance, rate);

        // Assert
        assert.strictEqual(result, 200);
    });

    test('rounds fare to nearest whole rupee', () => {
        const result = fareForRide(2.5, 10.5);
        assert.strictEqual(result, 26);
    });

    test('returns zero for zero distance', () => {
        const result = fareForRide(0, 20);
        assert.strictEqual(result, 0);
    });
});

// R2: totalFare Tests
describe('R2 - totalFare', () => {

    test('adds fares of all rides', () => {
        const rides = [
            { distanceKm: 5, ratePerKm: 10 },
            { distanceKm: 10, ratePerKm: 20 }
        ];

        const result = totalFare(rides);
        assert.strictEqual(result, 250);
    });

    test('returns zero for an empty ride list', () => {
        const result = totalFare([]);
        assert.strictEqual(result, 0);
    });
});

// R3: applyPeakSurcharge Tests
describe('R3 - applyPeakSurcharge', () => {

    test('adds 10 percent surcharge', () => {
        const result = applyPeakSurcharge(100, 10);
        assert.strictEqual(result, 110);
    });

    test('rounds the increased amount', () => {
        const result = applyPeakSurcharge(105, 10);
        assert.strictEqual(result, 116);
    });
});

// R4: waitingCharge Tests
describe('R4 - waitingCharge', () => {

    test('charges nothing for 4 minutes', () => {
        const result = waitingCharge(4);
        assert.strictEqual(result, 0);
    });

    test('charges nothing for 5 minutes', () => {
        const result = waitingCharge(5);
        assert.strictEqual(result, 0);
    });

    test('charges 10 rupees for 6 minutes', () => {
        const result = waitingCharge(6);
        assert.strictEqual(result, 10);
    });
});

// R5: rideSummary Tests
describe('R5 - rideSummary', () => {

    test('returns complete ride summary', () => {
        const rides = [
            { distanceKm: 10, ratePerKm: 10 }
        ];

        const result = rideSummary(rides, 10, 7);

        assert.deepStrictEqual(result, {
            fare: 100,
            surcharge: 10,
            waitingCharge: 20,
            total: 130
        });
    });

    test('returns zero values for empty rides and no waiting', () => {
        const result = rideSummary([], 10, 5);

        assert.deepStrictEqual(result, {
            fare: 0,
            surcharge: 0,
            waitingCharge: 0,
            total: 0
        });
    });
});

// R6: totalDistance Tests
describe('R6 - totalDistance', () => {

    test('calculates total distance of all rides', () => {
        const rides = [
            { distanceKm: 5 },
            { distanceKm: 10 },
            { distanceKm: 15 }
        ];

        const result = totalDistance(rides);
        assert.strictEqual(result, 30);
    });

    test('returns zero for an empty ride list', () => {
        const result = totalDistance([]);
        assert.strictEqual(result, 0);
    });
});