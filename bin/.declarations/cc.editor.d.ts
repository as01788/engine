declare module "cc/editor/animation-clip-migration" {
    export import AnimationClipLegacyData = AnimationClip._legacy.AnimationClipLegacyData;
    import { AnimationClip } from "cc";
    export {};
}
declare module "cc/editor/distributed" {
    export function isClientLoad(obj: CCObject): boolean;
    export function setClientLoad(obj: CCObject, value: boolean): void;
    import { CCObject } from "cc";
    export {};
}
declare module "cc/editor/exotic-animation" {
    export const exoticAnimationTag: unique symbol;
    /**
     * Animation that:
     * - does not exposed by users;
     * - does not compatible with regular animation;
     * - non-editable;
     * - currently only generated imported from model file.
     */
    export class ExoticAnimation {
        createEvaluator(binder: ___private.cocos_core_animation_tracks_track_Binder): ___private.cocos_core_animation_exotic_animation_exotic_animation_ExoticTrsAnimationEvaluator;
        addNodeAnimation(path: string): ___private.cocos_core_animation_exotic_animation_exotic_animation_ExoticNodeAnimation;
        collectAnimatedJoints(): string[];
        split(from: number, to: number): ExoticAnimation;
        /**
         * @internal
         */
        toHashString(): string;
    }
    import { __private as ___private } from "cc";
    export {};
}
declare module "cc/editor/macro" {
    export { macro } from "cc";
    export {};
}
declare module "cc/editor/new-gen-anim" {
    export function blend1D(weights: number[], thresholds: readonly number[], value: number): void;
    /**
     * Blends given samples using simple directional algorithm.
     * @param weights Result weights of each sample.
     * @param samples Every samples' parameter.
     * @param input Input parameter.
     */
    export const blendSimpleDirectional: (weights: number[], samples: readonly math.Vec2[], input: Readonly<math.Vec2>) => void;
    /**
     * Validates the samples if they satisfied the requirements of simple directional algorithm.
     * @param samples Samples to validate.
     * @returns Issues the samples containing.
     */
    export function validateSimpleDirectionalSamples(samples: ReadonlyArray<math.Vec2>): SimpleDirectionalSampleIssue[];
    /**
     * Simple directional issue representing some samples have same(or very similar) direction.
     */
    export class SimpleDirectionalIssueSameDirection {
        samples: readonly number[];
        constructor(samples: readonly number[]);
    }
    export type SimpleDirectionalSampleIssue = SimpleDirectionalIssueSameDirection;
    export class InvalidTransitionError extends Error {
        constructor(type: "to-entry" | "to-any" | "from-exit");
    }
    export class VariableNotDefinedError extends Error {
        constructor(name: string);
    }
    export class AnimationGraph extends Asset implements animation.AnimationGraphRunTime {
        readonly __brand: "AnimationGraph";
        constructor();
        onLoaded(): void;
        get layers(): readonly Layer[];
        get variables(): Iterable<[
            string,
            {
                type: animation.VariableType;
                value: Value;
            }
        ]>;
        /**
         * Adds a layer.
         * @returns The new layer.
         */
        addLayer(): Layer;
        /**
         * Removes a layer.
         * @param index Index to the layer to remove.
         */
        removeLayer(index: number): void;
        /**
         * Adjusts the layer's order.
         * @param index
         * @param newIndex
         */
        moveLayer(index: number, newIndex: number): void;
        addVariable(name: string, type: animation.VariableType, value?: Value): void;
        removeVariable(name: string): void;
        getVariable(name: string): Variable;
    }
    export enum LayerBlending {
        override = 0,
        additive = 1
    }
    export function isAnimationTransition(transition: Transition): transition is AnimationTransition;
    export class StateMachine extends ___private.cocos_core_data_editor_extendable_EditorExtendable {
        /**
         * // TODO: HACK
         * @internal
         */
        __callOnAfterDeserializeRecursive(): void;
        /**
         * @internal
         */
        constructor();
        [___private.cocos_core_data_deserialize_symbols_onAfterDeserializedTag](): void;
        [__private.cocos_core_animation_marionette_create_eval_createEval](context: __private.cocos_core_animation_marionette_motion_MotionEvalContext): __private.cocos_core_animation_marionette_motion_MotionEval | null;
        /**
         * The entry state.
         */
        get entryState(): State;
        /**
         * The exit state.
         */
        get exitState(): State;
        /**
         * The any state.
         */
        get anyState(): State;
        /**
         * Gets an iterator to all states within this graph.
         * @returns The iterator.
         */
        states(): Iterable<State>;
        /**
         * Gets an iterator to all transitions within this graph.
         * @returns The iterator.
         */
        transitions(): Iterable<__private.cocos_core_animation_marionette_animation_graph_Transition>;
        /**
         * Gets the transitions between specified states.
         * @param from Transition source.
         * @param to Transition target.
         * @returns Iterator to the transitions
         */
        getTransitionsBetween(from: State, to: State): Iterable<__private.cocos_core_animation_marionette_animation_graph_Transition>;
        /**
         * Gets all outgoing transitions of specified state.
         * @param to The state.
         * @returns Result transitions.
         */
        getOutgoings(from: State): Iterable<__private.cocos_core_animation_marionette_animation_graph_Transition>;
        /**
         * Gets all incoming transitions of specified state.
         * @param to The state.
         * @returns Result transitions.
         */
        getIncomings(to: State): Iterable<__private.cocos_core_animation_marionette_animation_graph_Transition>;
        /**
         * Adds a motion state into this state machine.
         * @returns The newly created motion.
         */
        addMotion(): MotionState;
        /**
         * Adds a sub state machine into this state machine.
         * @returns The newly created state machine.
         */
        addSubStateMachine(): SubStateMachine;
        /**
         * Removes specified state from this state machine.
         * @param state The state to remove.
         */
        remove(state: State): void;
        /**
         * Connect two states.
         * @param from Source state.
         * @param to Target state.
         * @param condition The transition condition.
         */
        connect(from: MotionState, to: State, conditions?: Condition[]): AnimationTransition;
        /**
         * Connect two states.
         * @param from Source state.
         * @param to Target state.
         * @param condition The transition condition.
         * @throws `InvalidTransitionError` if:
         * - the target state is entry or any, or
         * - the source state is exit.
         */
        connect(from: State, to: State, conditions?: Condition[]): Transition;
        disconnect(from: State, to: State): void;
        removeTransition(removal: __private.cocos_core_animation_marionette_animation_graph_Transition): void;
        eraseOutgoings(from: State): void;
        eraseIncomings(to: State): void;
        eraseTransitionsIncludes(state: State): void;
        clone(): StateMachine;
    }
    export class SubStateMachine extends __private.cocos_core_animation_marionette_state_InteractiveState {
        get stateMachine(): StateMachine;
        clone(): SubStateMachine;
    }
    export type Transition = Omit<__private.cocos_core_animation_marionette_animation_graph_Transition, "from" | "to"> & {
        readonly from: __private.cocos_core_animation_marionette_animation_graph_Transition["from"];
        readonly to: __private.cocos_core_animation_marionette_animation_graph_Transition["to"];
    };
    export type AnimationTransition = Omit<__private.cocos_core_animation_marionette_animation_graph_AnimationTransition, "from" | "to"> & {
        readonly from: __private.cocos_core_animation_marionette_animation_graph_AnimationTransition["from"];
        readonly to: __private.cocos_core_animation_marionette_animation_graph_AnimationTransition["to"];
    };
    export class Layer implements __private.cocos_core_animation_marionette_ownership_OwnedBy<AnimationGraph> {
        [__private.cocos_core_animation_marionette_ownership_ownerSymbol]: AnimationGraph | undefined;
        name: string;
        weight: number;
        mask: ___private.cocos_core_animation_skeleton_mask_SkeletonMask | null;
        blending: LayerBlending;
        /**
         * @internal
         */
        constructor();
        get stateMachine(): StateMachine;
    }
    export class State extends ___private.cocos_core_data_editor_extendable_EditorExtendable implements __private.cocos_core_animation_marionette_ownership_OwnedBy<Layer | StateMachine> {
        [__private.cocos_core_animation_marionette_ownership_ownerSymbol]: StateMachine | undefined;
        name: string;
        [__private.cocos_core_animation_marionette_state_outgoingsSymbol]: __private.cocos_core_animation_marionette_animation_graph_TransitionInternal[];
        [__private.cocos_core_animation_marionette_state_incomingsSymbol]: __private.cocos_core_animation_marionette_animation_graph_TransitionInternal[];
        /**
         * @internal
         */
        constructor();
    }
    export class Variable {
        constructor(type?: animation.VariableType);
        get type(): animation.VariableType;
        get value(): Value;
        set value(value: Value);
    }
    export class BinaryCondition implements Condition {
        static readonly Operator: typeof __private.cocos_core_animation_marionette_condition_BinaryOperator;
        operator: __private.cocos_core_animation_marionette_condition_BinaryOperator;
        lhs: BindableNumber;
        rhs: BindableNumber;
        clone(): BinaryCondition;
        [__private.cocos_core_animation_marionette_create_eval_createEval](context: __private.cocos_core_animation_marionette_parametric_BindContext): __private.cocos_core_animation_marionette_condition_BinaryConditionEval;
    }
    export namespace BinaryCondition {
        export type Operator = __private.cocos_core_animation_marionette_condition_BinaryOperator;
    }
    export class UnaryCondition implements Condition {
        static readonly Operator: typeof __private.cocos_core_animation_marionette_condition_UnaryOperator;
        operator: __private.cocos_core_animation_marionette_condition_UnaryOperator;
        operand: BindableBoolean;
        clone(): UnaryCondition;
        [__private.cocos_core_animation_marionette_create_eval_createEval](context: __private.cocos_core_animation_marionette_condition_ConditionEvalContext): __private.cocos_core_animation_marionette_condition_UnaryConditionEval;
    }
    export namespace UnaryCondition {
        export type Operator = __private.cocos_core_animation_marionette_condition_UnaryOperator;
    }
    export class TriggerCondition implements Condition {
        trigger: string;
        clone(): TriggerCondition;
        [__private.cocos_core_animation_marionette_create_eval_createEval](context: __private.cocos_core_animation_marionette_parametric_BindContext): __private.cocos_core_animation_marionette_condition_ConditionEval;
    }
    export interface Condition {
        clone(): Condition;
        [__private.cocos_core_animation_marionette_create_eval_createEval](context: __private.cocos_core_animation_marionette_parametric_BindContext): __private.cocos_core_animation_marionette_condition_ConditionEval;
    }
    export type Value = number | string | boolean;
    export class MotionState extends __private.cocos_core_animation_marionette_state_InteractiveState {
        motion: __private.cocos_core_animation_marionette_motion_Motion | null;
        speed: BindableNumber;
        clone(): MotionState;
    }
    export class ClipMotion extends ___private.cocos_core_data_editor_extendable_EditorExtendable implements __private.cocos_core_animation_marionette_motion_Motion {
        clip: AnimationClip | null;
        [__private.cocos_core_animation_marionette_create_eval_createEval](context: __private.cocos_core_animation_marionette_motion_MotionEvalContext): __private.cocos_core_animation_marionette_clip_motion_ClipMotionEval | null;
        clone(): ClipMotion;
    }
    export interface AnimationBlend extends __private.cocos_core_animation_marionette_motion_Motion, ___private.cocos_core_data_editor_extendable_EditorExtendable {
        [__private.cocos_core_animation_marionette_create_eval_createEval](_context: __private.cocos_core_animation_marionette_motion_MotionEvalContext): __private.cocos_core_animation_marionette_motion_MotionEval | null;
    }
    export class AnimationBlend extends ___private.cocos_core_data_editor_extendable_EditorExtendable implements __private.cocos_core_animation_marionette_motion_Motion {
        name: string;
    }
    export class AnimationBlendDirect extends AnimationBlend {
        static Item: typeof __private.cocos_core_animation_marionette_animation_blend_direct_AnimationBlendDirectItem;
        get items(): __private.cocos_core_animation_marionette_animation_blend_direct_AnimationBlendDirectItem[];
        set items(value: __private.cocos_core_animation_marionette_animation_blend_direct_AnimationBlendDirectItem[]);
        clone(): AnimationBlendDirect;
        [__private.cocos_core_animation_marionette_create_eval_createEval](context: __private.cocos_core_animation_marionette_motion_MotionEvalContext): __private.cocos_core_animation_marionette_animation_blend_direct_AnimationBlendDirectEval;
    }
    export namespace AnimationBlendDirect {
        export type Item = __private.cocos_core_animation_marionette_animation_blend_direct_AnimationBlendDirectItem;
    }
    export class AnimationBlend1D extends AnimationBlend {
        static Item: typeof __private.cocos_core_animation_marionette_animation_blend_1d_AnimationBlend1DItem;
        param: BindableNumber;
        get items(): Iterable<__private.cocos_core_animation_marionette_animation_blend_1d_AnimationBlend1DItem>;
        set items(value: Iterable<__private.cocos_core_animation_marionette_animation_blend_1d_AnimationBlend1DItem>);
        clone(): AnimationBlend1D;
        [__private.cocos_core_animation_marionette_create_eval_createEval](context: __private.cocos_core_animation_marionette_motion_MotionEvalContext): __private.cocos_core_animation_marionette_animation_blend_1d_AnimationBlend1DEval;
    }
    export namespace AnimationBlend1D {
        export type Item = __private.cocos_core_animation_marionette_animation_blend_1d_AnimationBlend1DItem;
    }
    export class AnimationBlend2D extends AnimationBlend {
        static Algorithm: typeof __private.cocos_core_animation_marionette_animation_blend_2d_Algorithm;
        static Item: typeof __private.cocos_core_animation_marionette_animation_blend_2d_AnimationBlend2DItem;
        algorithm: __private.cocos_core_animation_marionette_animation_blend_2d_Algorithm;
        paramX: BindableNumber;
        paramY: BindableNumber;
        get items(): Iterable<__private.cocos_core_animation_marionette_animation_blend_2d_AnimationBlend2DItem>;
        set items(items: Iterable<__private.cocos_core_animation_marionette_animation_blend_2d_AnimationBlend2DItem>);
        clone(): AnimationBlend2D;
        [__private.cocos_core_animation_marionette_create_eval_createEval](context: __private.cocos_core_animation_marionette_motion_MotionEvalContext): __private.cocos_core_animation_marionette_animation_blend_2d_AnimationBlend2DEval;
    }
    export namespace AnimationBlend2D {
        export type Algorithm = typeof __private.cocos_core_animation_marionette_animation_blend_2d_Algorithm;
        export type Item = __private.cocos_core_animation_marionette_animation_blend_2d_AnimationBlend2DItem;
    }
    export class BindableNumber implements __private.cocos_core_animation_marionette_parametric_Bindable<number> {
        variable: string;
        value: number;
        constructor(value?: number);
        clone(): __private.cocos_core_animation_marionette_parametric_Bindable<number>;
    }
    export class BindableBoolean implements __private.cocos_core_animation_marionette_parametric_Bindable<boolean> {
        variable: string;
        value: boolean;
        constructor(value?: boolean);
        clone(): __private.cocos_core_animation_marionette_parametric_Bindable<boolean>;
    }
    export function __getDemoGraphs(): Record<string, AnimationGraph>;
    export import VariableType = animation.VariableType;
    export namespace __private {
        export const cocos_core_animation_marionette_create_eval_createEval: unique symbol;
        export class cocos_core_animation_marionette_graph_eval_VarInstance {
            type: animation.VariableType;
            constructor(type: animation.VariableType, value: Value);
            get value(): Value;
            set value(value: Value);
            bind<T, TThis, ExtraArgs extends any[]>(fn: (this: TThis, value: T, ...args: ExtraArgs) => void, thisArg: TThis, ...args: ExtraArgs): Value;
        }
        export interface cocos_core_animation_marionette_parametric_BindContext {
            getVar(id: string): cocos_core_animation_marionette_graph_eval_VarInstance | undefined;
        }
        export interface cocos_core_animation_marionette_motion_MotionEvalContext extends cocos_core_animation_marionette_parametric_BindContext {
            node: Node;
            blendBuffer: ___private.cocos_3d_skeletal_animation_skeletal_animation_blending_BlendStateBuffer;
            mask?: ___private.cocos_core_animation_skeleton_mask_SkeletonMask;
        }
        export interface cocos_core_animation_marionette_motion_MotionEval {
            readonly duration: number;
            sample(progress: number, baseWeight: number): void;
            getClipStatuses(baseWeight: number): Iterator<animation.ClipStatus>;
        }
        export const cocos_core_animation_marionette_ownership_ownerSymbol: unique symbol;
        export interface cocos_core_animation_marionette_ownership_OwnedBy<T> {
            [cocos_core_animation_marionette_ownership_ownerSymbol]: T | undefined;
        }
        export class cocos_core_animation_marionette_animation_graph_Transition extends ___private.cocos_core_data_editor_extendable_EditorExtendable implements cocos_core_animation_marionette_ownership_OwnedBy<StateMachine>, cocos_core_animation_marionette_animation_graph_Transition {
            [cocos_core_animation_marionette_ownership_ownerSymbol]: StateMachine | undefined;
            /**
             * The transition source.
             */
            from: State;
            /**
             * The transition target.
             */
            to: State;
            /**
             * The transition condition.
             */
            conditions: Condition[];
            /**
             * @internal
             */
            constructor(from: State, to: State, conditions?: Condition[]);
            [cocos_core_animation_marionette_ownership_ownerSymbol]: StateMachine | undefined;
        }
        export type cocos_core_animation_marionette_state_StateMachineComponentConstructor<T extends animation.StateMachineComponent> = ___private.Constructor<T>;
        export class cocos_core_animation_marionette_state_InteractiveState extends State {
            get components(): Iterable<animation.StateMachineComponent>;
            addComponent<T extends animation.StateMachineComponent>(constructor: cocos_core_animation_marionette_state_StateMachineComponentConstructor<T>): T;
            removeComponent(component: animation.StateMachineComponent): void;
            instantiateComponents(): animation.StateMachineComponent[];
        }
        export class cocos_core_animation_marionette_animation_graph_AnimationTransition extends cocos_core_animation_marionette_animation_graph_Transition {
            /**
             * The transition duration.
             * The unit of the duration is the real duration of transition source
             * if `relativeDuration` is `true` or seconds otherwise.
             */
            duration: number;
            /**
             * Determines the unit of transition duration. See `duration`.
             */
            relativeDuration: boolean;
            exitConditionEnabled: boolean;
            get exitCondition(): number;
            set exitCondition(value: number);
        }
        export const cocos_core_animation_marionette_state_outgoingsSymbol: unique symbol;
        export type cocos_core_animation_marionette_animation_graph_TransitionInternal = cocos_core_animation_marionette_animation_graph_Transition;
        export const cocos_core_animation_marionette_state_incomingsSymbol: unique symbol;
        export enum cocos_core_animation_marionette_condition_BinaryOperator {
            EQUAL_TO = 0,
            NOT_EQUAL_TO = 1,
            LESS_THAN = 2,
            LESS_THAN_OR_EQUAL_TO = 3,
            GREATER_THAN = 4,
            GREATER_THAN_OR_EQUAL_TO = 5
        }
        export interface cocos_core_animation_marionette_condition_ConditionEval {
            /**
             * Evaluates this condition.
             */
            eval(): boolean;
        }
        export class cocos_core_animation_marionette_condition_BinaryConditionEval implements cocos_core_animation_marionette_condition_ConditionEval {
            constructor(operator: cocos_core_animation_marionette_condition_BinaryOperator, lhs: number, rhs: number);
            reset(lhs: number, rhs: number): void;
            setLhs(value: number): void;
            setRhs(value: number): void;
            /**
             * Evaluates this condition.
             */
            eval(): boolean;
        }
        export enum cocos_core_animation_marionette_condition_UnaryOperator {
            TRUTHY = 0,
            FALSY = 1
        }
        export type cocos_core_animation_marionette_condition_ConditionEvalContext = cocos_core_animation_marionette_parametric_BindContext;
        export class cocos_core_animation_marionette_condition_UnaryConditionEval implements cocos_core_animation_marionette_condition_ConditionEval {
            constructor(operator: cocos_core_animation_marionette_condition_UnaryOperator, operand: boolean);
            reset(value: boolean): void;
            setOperand(value: boolean): void;
            /**
             * Evaluates this condition.
             */
            eval(): boolean;
        }
        export interface cocos_core_animation_marionette_motion_Motion {
            [cocos_core_animation_marionette_create_eval_createEval](context: cocos_core_animation_marionette_motion_MotionEvalContext): cocos_core_animation_marionette_motion_MotionEval | null;
            clone(): cocos_core_animation_marionette_motion_Motion;
        }
        export class cocos_core_animation_marionette_clip_motion_ClipMotionEval implements cocos_core_animation_marionette_motion_MotionEval {
            __DEBUG__ID__?: string;
            readonly duration: number;
            constructor(context: cocos_core_animation_marionette_motion_MotionEvalContext, clip: AnimationClip);
            getClipStatuses(baseWeight: number): Iterator<animation.ClipStatus, any, undefined>;
            get progress(): number;
            sample(progress: number, weight: number): void;
        }
        export class cocos_core_animation_marionette_animation_blend_AnimationBlendItem {
            motion: cocos_core_animation_marionette_motion_Motion | null;
            clone(): cocos_core_animation_marionette_animation_blend_AnimationBlendItem;
            protected _assign(that: cocos_core_animation_marionette_animation_blend_AnimationBlendItem): cocos_core_animation_marionette_animation_blend_AnimationBlendItem;
        }
        export class cocos_core_animation_marionette_animation_blend_direct_AnimationBlendDirectItem extends cocos_core_animation_marionette_animation_blend_AnimationBlendItem {
            weight: number;
            clone(): cocos_core_animation_marionette_animation_blend_direct_AnimationBlendDirectItem;
            protected _assign(that: cocos_core_animation_marionette_animation_blend_direct_AnimationBlendDirectItem): cocos_core_animation_marionette_animation_blend_direct_AnimationBlendDirectItem;
        }
        export class cocos_core_animation_marionette_animation_blend_AnimationBlendEval implements cocos_core_animation_marionette_motion_MotionEval {
            constructor(context: cocos_core_animation_marionette_motion_MotionEvalContext, children: cocos_core_animation_marionette_animation_blend_AnimationBlendItem[], inputs: number[]);
            get duration(): number;
            getClipStatuses(baseWeight: number): Iterator<animation.ClipStatus, any, undefined>;
            sample(progress: number, weight: number): void;
            setInput(value: number, index: number): void;
            protected doEval(): void;
            protected eval(_weights: number[], _inputs: readonly number[]): void;
        }
        export class cocos_core_animation_marionette_animation_blend_direct_AnimationBlendDirectEval extends cocos_core_animation_marionette_animation_blend_AnimationBlendEval {
            constructor(...args: ConstructorParameters<typeof cocos_core_animation_marionette_animation_blend_AnimationBlendEval>);
            protected eval(weights: number[], inputs: readonly number[]): void;
        }
        export class cocos_core_animation_marionette_animation_blend_1d_AnimationBlend1DItem extends cocos_core_animation_marionette_animation_blend_AnimationBlendItem {
            threshold: number;
            clone(): cocos_core_animation_marionette_animation_blend_1d_AnimationBlend1DItem;
            protected _assign(that: cocos_core_animation_marionette_animation_blend_1d_AnimationBlend1DItem): cocos_core_animation_marionette_animation_blend_1d_AnimationBlend1DItem;
        }
        export class cocos_core_animation_marionette_animation_blend_1d_AnimationBlend1DEval extends cocos_core_animation_marionette_animation_blend_AnimationBlendEval {
            constructor(context: cocos_core_animation_marionette_motion_MotionEvalContext, items: cocos_core_animation_marionette_animation_blend_AnimationBlendItem[], thresholds: readonly number[], input: number);
            protected eval(weights: number[], [value]: readonly [
                number
            ]): void;
        }
        export enum cocos_core_animation_marionette_animation_blend_2d_Algorithm {
            SIMPLE_DIRECTIONAL = 0,
            FREEFORM_CARTESIAN = 1,
            FREEFORM_DIRECTIONAL = 2
        }
        export class cocos_core_animation_marionette_animation_blend_2d_AnimationBlend2DItem extends cocos_core_animation_marionette_animation_blend_AnimationBlendItem {
            threshold: math.Vec2;
            clone(): cocos_core_animation_marionette_animation_blend_2d_AnimationBlend2DItem;
            protected _assign(that: cocos_core_animation_marionette_animation_blend_2d_AnimationBlend2DItem): cocos_core_animation_marionette_animation_blend_2d_AnimationBlend2DItem;
        }
        export class cocos_core_animation_marionette_animation_blend_2d_AnimationBlend2DEval extends cocos_core_animation_marionette_animation_blend_AnimationBlendEval {
            constructor(context: cocos_core_animation_marionette_motion_MotionEvalContext, items: cocos_core_animation_marionette_animation_blend_AnimationBlendItem[], thresholds: readonly math.Vec2[], algorithm: cocos_core_animation_marionette_animation_blend_2d_Algorithm, inputs: [
                number,
                number
            ]);
            protected eval(weights: number[], [x, y]: [
                number,
                number
            ]): void;
        }
        export interface cocos_core_animation_marionette_parametric_Bindable<TValue> {
            value: TValue;
            variable: string;
            clone(): cocos_core_animation_marionette_parametric_Bindable<TValue>;
        }
    }
    import { math, animation, Asset, __private as ___private, Node, AnimationClip } from "cc";
    export {};
}
declare module "cc/editor/offline-mappings" {
    export const effectStructure: {
        $techniques: {
            $passes: {
                depthStencilState: {};
                rasterizerState: {};
                blendState: {
                    targets: {}[];
                };
                properties: {
                    any: {
                        sampler: {};
                        editor: {};
                    };
                };
                migrations: {
                    properties: {
                        any: {};
                    };
                    macros: {
                        any: {};
                    };
                };
                embeddedMacros: {};
            }[];
        }[];
    };
    export const isSampler: (type: any) => boolean;
    export const typeMap: Record<string, gfx.Type | string>;
    export const formatMap: {
        bool: gfx.Format;
        bvec2: gfx.Format;
        bvec3: gfx.Format;
        bvec4: gfx.Format;
        int: gfx.Format;
        ivec2: gfx.Format;
        ivec3: gfx.Format;
        ivec4: gfx.Format;
        uint: gfx.Format;
        uvec2: gfx.Format;
        uvec3: gfx.Format;
        uvec4: gfx.Format;
        float: gfx.Format;
        vec2: gfx.Format;
        vec3: gfx.Format;
        vec4: gfx.Format;
        int8_t: gfx.Format;
        i8vec2: gfx.Format;
        i8vec3: gfx.Format;
        i8vec4: gfx.Format;
        uint8_t: gfx.Format;
        u8vec2: gfx.Format;
        u8vec3: gfx.Format;
        u8vec4: gfx.Format;
        int16_t: gfx.Format;
        i16vec2: gfx.Format;
        i16vec3: gfx.Format;
        i16vec4: gfx.Format;
        uint16_t: gfx.Format;
        u16vec2: gfx.Format;
        u16vec3: gfx.Format;
        u16vec4: gfx.Format;
        float16_t: gfx.Format;
        f16vec2: gfx.Format;
        f16vec3: gfx.Format;
        f16vec4: gfx.Format;
        mat2: gfx.Format;
        mat3: gfx.Format;
        mat4: gfx.Format;
        mat2x2: gfx.Format;
        mat3x3: gfx.Format;
        mat4x4: gfx.Format;
        mat2x3: gfx.Format;
        mat2x4: gfx.Format;
        mat3x2: gfx.Format;
        mat3x4: gfx.Format;
        mat4x2: gfx.Format;
        mat4x3: gfx.Format;
    };
    export const getFormat: (name: string) => any;
    export const getShaderStage: (name: string) => any;
    export const getDescriptorType: (name: string) => any;
    export const isNormalized: (format: string) => boolean;
    export const isPaddedMatrix: (type: any) => boolean;
    export const getMemoryAccessFlag: (access: string) => gfx.MemoryAccessBit;
    export const passParams: {
        NONE: gfx.ColorMask;
        R: gfx.ColorMask;
        G: gfx.ColorMask;
        B: gfx.ColorMask;
        A: gfx.ColorMask;
        RG: number;
        RB: number;
        RA: number;
        GB: number;
        GA: number;
        BA: number;
        RGB: number;
        RGA: number;
        RBA: number;
        GBA: number;
        ALL: gfx.ColorMask;
        ADD: gfx.BlendOp;
        SUB: gfx.BlendOp;
        REV_SUB: gfx.BlendOp;
        MIN: gfx.BlendOp;
        MAX: gfx.BlendOp;
        ZERO: gfx.BlendFactor;
        ONE: gfx.BlendFactor;
        SRC_ALPHA: gfx.BlendFactor;
        DST_ALPHA: gfx.BlendFactor;
        ONE_MINUS_SRC_ALPHA: gfx.BlendFactor;
        ONE_MINUS_DST_ALPHA: gfx.BlendFactor;
        SRC_COLOR: gfx.BlendFactor;
        DST_COLOR: gfx.BlendFactor;
        ONE_MINUS_SRC_COLOR: gfx.BlendFactor;
        ONE_MINUS_DST_COLOR: gfx.BlendFactor;
        SRC_ALPHA_SATURATE: gfx.BlendFactor;
        CONSTANT_COLOR: gfx.BlendFactor;
        ONE_MINUS_CONSTANT_COLOR: gfx.BlendFactor;
        CONSTANT_ALPHA: gfx.BlendFactor;
        ONE_MINUS_CONSTANT_ALPHA: gfx.BlendFactor;
        KEEP: gfx.StencilOp;
        REPLACE: gfx.StencilOp;
        INCR: gfx.StencilOp;
        DECR: gfx.StencilOp;
        INVERT: gfx.StencilOp;
        INCR_WRAP: gfx.StencilOp;
        DECR_WRAP: gfx.StencilOp;
        NEVER: gfx.ComparisonFunc;
        LESS: gfx.ComparisonFunc;
        EQUAL: gfx.ComparisonFunc;
        LESS_EQUAL: gfx.ComparisonFunc;
        GREATER: gfx.ComparisonFunc;
        NOT_EQUAL: gfx.ComparisonFunc;
        GREATER_EQUAL: gfx.ComparisonFunc;
        ALWAYS: gfx.ComparisonFunc;
        FRONT: gfx.CullMode;
        BACK: gfx.CullMode;
        GOURAND: gfx.ShadeModel;
        FLAT: gfx.ShadeModel;
        FILL: gfx.PolygonMode;
        LINE: gfx.PolygonMode;
        POINT: gfx.PolygonMode;
        POINT_LIST: gfx.PrimitiveMode;
        LINE_LIST: gfx.PrimitiveMode;
        LINE_STRIP: gfx.PrimitiveMode;
        LINE_LOOP: gfx.PrimitiveMode;
        TRIANGLE_LIST: gfx.PrimitiveMode;
        TRIANGLE_STRIP: gfx.PrimitiveMode;
        TRIANGLE_FAN: gfx.PrimitiveMode;
        LINE_LIST_ADJACENCY: gfx.PrimitiveMode;
        LINE_STRIP_ADJACENCY: gfx.PrimitiveMode;
        TRIANGLE_LIST_ADJACENCY: gfx.PrimitiveMode;
        TRIANGLE_STRIP_ADJACENCY: gfx.PrimitiveMode;
        TRIANGLE_PATCH_ADJACENCY: gfx.PrimitiveMode;
        QUAD_PATCH_LIST: gfx.PrimitiveMode;
        ISO_LINE_LIST: gfx.PrimitiveMode;
        LINEAR: gfx.Filter;
        ANISOTROPIC: gfx.Filter;
        WRAP: gfx.Address;
        MIRROR: gfx.Address;
        CLAMP: gfx.Address;
        BORDER: gfx.Address;
        LINE_WIDTH: gfx.DynamicStateFlagBit;
        DEPTH_BIAS: gfx.DynamicStateFlagBit;
        BLEND_CONSTANTS: gfx.DynamicStateFlagBit;
        DEPTH_BOUNDS: gfx.DynamicStateFlagBit;
        STENCIL_WRITE_MASK: gfx.DynamicStateFlagBit;
        STENCIL_COMPARE_MASK: gfx.DynamicStateFlagBit;
        TRUE: boolean;
        FALSE: boolean;
    };
    export import Sampler = gfx.Sampler;
    export import SamplerInfo = gfx.SamplerInfo;
    export import SetIndex = pipeline.SetIndex;
    export import RenderPriority = pipeline.RenderPriority;
    export import GetTypeSize = gfx.GetTypeSize;
    export { murmurhash2_32_gc } from "cc";
    import { gfx, pipeline } from "cc";
    export {};
}
declare module "cc/editor/particle-system-2d-utils" {
    /**
     * A png file reader
     * @name PNGReader
     */
    export class PNGReader {
        constructor(data: any);
        read(bytes: any): any[];
        readUInt32(): number;
        readUInt16(): number;
        decodePixels(data: any): Uint8Array;
        copyToImageData(imageData: any, pixels: any): void;
        decodePalette(): Uint8Array;
        render(canvas: any): any;
    }
    /**
     * cc.tiffReader is a singleton object, it's a tiff file reader, it can parse byte array to draw into a canvas
     * @class
     * @name tiffReader
     */
    export class TiffReader {
        constructor();
        getUint8(offset: any): never;
        getUint16(offset: any): number;
        getUint32(offset: any): number;
        checkLittleEndian(): boolean;
        hasTowel(): boolean;
        getFieldTypeName(fieldType: any): any;
        getFieldTagName(fieldTag: any): any;
        getFieldTypeLength(fieldTypeName: any): 1 | 0 | 4 | 2 | 8;
        getFieldValues(fieldTagName: any, fieldTypeName: any, typeCount: any, valueOffset: any): any[];
        getBytes(numBytes: any, offset: any): number;
        getBits(numBits: any, byteOffset: any, bitOffset: any): {
            bits: number;
            byteOffset: any;
            bitOffset: number;
        };
        parseFileDirectory(offset: any): void;
        clampColorSample(colorSample: any, bitsPerSample: any): number;
        /**
         * @function
         * @param {Array} tiffData
         * @param {HTMLCanvasElement} canvas
         * @returns {*}
         */
        parseTIFF(tiffData: any, canvas: any): any;
    }
    export function getImageFormatByData(imgData: any): ImageFormat.PNG | ImageFormat.TIFF | ImageFormat.UNKNOWN;
    /**
     * Image formats
     * @enum macro.ImageFormat
     */
    export enum ImageFormat {
        /**
         * @en Image Format:JPG
         * @zh 图片格式:JPG
         */
        JPG = 0,
        /**
         * @en Image Format:PNG
         * @zh 图片格式:PNG
         */
        PNG = 1,
        /**
         * @en Image Format:TIFF
         * @zh 图片格式:TIFF
         */
        TIFF = 2,
        /**
         * @en Image Format:WEBP
         * @zh 图片格式:WEBP
         */
        WEBP = 3,
        /**
         * @en Image Format:PVR
         * @zh 图片格式:PVR
         */
        PVR = 4,
        /**
         * @en Image Format:ETC
         * @zh 图片格式:ETC
         */
        ETC = 5,
        /**
         * @en Image Format:S3TC
         * @zh 图片格式:S3TC
         */
        S3TC = 6,
        /**
         * @en Image Format:ATITC
         * @zh 图片格式:ATITC
         */
        ATITC = 7,
        /**
         * @en Image Format:TGA
         * @zh 图片格式:TGA
         */
        TGA = 8,
        /**
         * @en Image Format:RAWDATA
         * @zh 图片格式:RAWDATA
         */
        RAWDATA = 9,
        /**
         * @en Image Format:UNKNOWN
         * @zh 图片格式:UNKNOWN
         */
        UNKNOWN = 10
    }
    export import codec = sp.spine;
    import { sp } from "cc";
    export {};
}
declare module "cc/editor/populate-internal-constants" {
    export {};
}
declare module "cc/editor/serialization" {
    export class CCON {
        constructor(document: unknown, chunks: Uint8Array[]);
        get document(): unknown;
        get chunks(): Uint8Array[];
    }
    export function encodeCCONJson(ccon: CCON, chunkURLs: string[]): unknown;
    export function encodeCCONBinary(ccon: CCON): Uint8Array;
    export class BufferBuilder {
        get byteLength(): number;
        alignAs(align: number): number;
        append(view: ArrayBufferView): number;
        get(): Uint8Array;
    }
    export function decodeCCONBinary(bytes: Uint8Array): CCON;
    export function parseCCONJson(json: unknown): {
        chunks: string[];
        document: unknown;
    };
    export {};
}
