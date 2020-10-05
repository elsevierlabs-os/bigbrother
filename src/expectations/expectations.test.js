import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import _expect from './expect';

describe.only('Expectations', () => {
    describe('toExist', () => {
        it('should throw an exception if value does not exist', () => {
            const expectation = () => _expect(null).toExist();
            expect(expectation).to.throw();
        });

        it('should return true if the value exists', () => {
            const expectation = () => _expect('something').toExist();
            expect(expectation()).to.equal(true);
        });
    });

    describe('toBeLessThan', () => {
        it('should throw an exception if value is greater than target', () => {
            const expectation = () => _expect(100).toBeLessThan(10);
            expect(expectation).to.throw();
        });

        it('should throw an exception if value is equal to target', () => {
            const expectation = () => _expect(10).toBeLessThan(10);
            expect(expectation).to.throw();
        });

        it('should return true if value is less than target', () => {
            const expectation = () => _expect(10).toBeLessThan(100);
            expect(expectation()).to.equal(true);
        });
    });

    describe('toBeEqual', () => {
        it('should throw an exception if value is not equal to target', () => {
            const expectation = () => _expect(100).toBeEqual(10);
            expect(expectation).to.throw();
        });

        it('should return true if value is equal to target', () => {
            const expectation = () => _expect(100).toBeEqual(100);
            expect(expectation()).to.equal(true);
        });
    });

    describe('toMatchRecording', () => {
        let MockExpectation, compareWithStoredRecording, recordingExists, recordPage;

        beforeEach(() => {
            compareWithStoredRecording = sinon.stub();
            recordingExists = sinon.stub();
            recordPage = sinon.stub();

            MockExpectation = proxyquire.noCallThru().load('./Expectation', {
                '../page/PageRecorder': {
                    compareWithStoredRecording,
                    recordingExists,
                    recordPage
                }
            }).default;
        });

        it('should call record page if page recording doesnt exist', () => {
            recordingExists.returns(false);
            const mockPage = {};

            const expectation = new MockExpectation(mockPage);
            expectation.toMatchRecording();

            expect(recordPage.calledWith(mockPage)).to.equal(true);
        });

        it('should call compareWithStoredRecording if page recording exists', () => {
            recordingExists.returns(true);
            const mockPage = {};

            const expectation = new MockExpectation(mockPage);
            expectation.toMatchRecording();

            expect(compareWithStoredRecording.calledWith(mockPage)).to.equal(true);
        });
    });

    describe('toBeWithinRange', () => {
        it('should throw an exception if value is not between range', () => {
            const expectation = () => _expect(10).toBeWithinRange(30, 50);
            expect(expectation).to.throw();
        });

        it('should return true if value is between range', () => {
            const expectation = () => _expect(20).toBeWithinRange(10, 30);
            expect(expectation()).to.equal(true);
        });
    });

    describe('toBeMoreThan', () => {
        it('should throw an exception if the value is less than target', () => {
            const expectation = () => _expect(10).toBeMoreThan(30);
            expect(expectation).to.throw();
        });

        it('should throw an exception if value is equal to target', () => {
            const expectation = () => _expect(10).toBeMoreThan(10);
            expect(expectation).to.throw();
        });

        it('should return true if the value is more than the target', () => {
            const expectation = () => _expect(20).toBeMoreThan(10);
            expect(expectation()).to.equal(true);
        });
    });
});
