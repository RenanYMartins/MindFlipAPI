import { DatabaseSingleton } from '@config/DatabaseSingleton';
import { FlashcardAdapter } from '@shared/adapters/FlashcardAdapter';
import { Flashcard } from '@shared/models/Flashcard';
import { Result } from '@shared/models/Result';
import { CreateFlashcard } from '../models/CreateFlashcard';
import { IActionRepository } from '@shared/interfaces/IActionRepository';
import { PrismaClient } from '@prisma/client';
import { Action } from '@shared/models/Action';
import { FlashcardActionAdapter } from '@shared/adapters/FlashcardActionAdapter';
import { FlashcardAction } from '@shared/models/FlashcardAction';
import { UpdateFlashcard } from '../models/UpdateFlashcard';
import { User } from '@shared/models/User';
import { UserAdapter } from '@shared/adapters/UserAdapter';

export class FlashcardRepository implements IActionRepository<Flashcard> {
    private readonly db = DatabaseSingleton.getInstance();
    private readonly adapter = new FlashcardAdapter();
    private readonly actionAdapter = new FlashcardActionAdapter();
    private readonly userAdapter = new UserAdapter();

    public async create(flashcard: CreateFlashcard, client?: PrismaClient): Promise<Result<Flashcard>> {
        const result = await this.db.execute(
            (client) =>
                client.flashcard.create({
                    data: {
                        question: flashcard.question,
                        response: flashcard.response,
                        color: flashcard.color,
                        topicId: flashcard.topicId
                    }
                }),
            client
        );

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok(this.adapter.fromEntity(result.value!));
    }

    public async update(flashcard: UpdateFlashcard): Promise<Result<Flashcard>> {
        const result = await this.db.execute((client) =>
            client.flashcard.update({
                data: {
                    question: flashcard.question,
                    response: flashcard.response,
                    color: flashcard.color,
                    topicId: flashcard.topicId
                },
                where: {
                    id: flashcard.id
                }
            })
        );

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok(this.adapter.fromEntity(result.value!));
    }

    public async deleteById(flashcardId: number): Promise<Result<Flashcard>> {
        const result = await this.db.execute((client) => client.flashcard.delete({ where: { id: flashcardId } }));

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok(this.adapter.fromEntity(result.value!));
    }

    public async getById(flashcardId: number): Promise<Result<Flashcard | null>> {
        const result = await this.db.execute((client) => client.flashcard.findUnique({ where: { id: flashcardId } }));

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok(this.adapter.fromEntity(result.value!));
    }

    public async getOwner(flashcardId: number): Promise<Result<User | null>> {
        const result = await this.db.execute((client) =>
            client.flashcard.findUnique({ select: { topic: { select: { user: true } } }, where: { id: flashcardId } })
        );

        if (result.isError) {
            return Result.error(result.error!);
        }

        if (result.value == null) {
            return Result.ok(null);
        }

        return Result.ok(this.userAdapter.fromEntity(result.value!.topic.user));
    }

    public async getAllBySubTopicId(subTopicId: number, skip: number, take: number): Promise<Result<Flashcard[]>> {
        const result = await this.db.execute((client) =>
            client.flashcard.findMany({
                skip: skip,
                take: take,
                where: {
                    topicId: subTopicId
                }
            })
        );

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok(result.value!.map((card) => this.adapter.fromEntity(card)));
    }

    public async getTotalBySubTopicId(subTopicId: number): Promise<Result<{ total: number }>> {
        const result = await this.db.execute((client) => client.flashcard.count({ where: { topicId: subTopicId } }));

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok({ total: result.value! });
    }

    public async registerAction(
        client: PrismaClient,
        action: Action,
        value: Flashcard
    ): Promise<Result<FlashcardAction>> {
        const result = await this.db.execute(
            (client) =>
                client.flashcardAction.create({
                    data: { actionId: action.id, flashcardId: value.id },
                    include: {
                        flashcard: true,
                        action: {
                            include: {
                                user: true
                            }
                        }
                    }
                }),
            client
        );

        if (result.isError) {
            return Result.error(result.error!);
        }

        return Result.ok(this.actionAdapter.fromEntity(result.value!));
    }
}
