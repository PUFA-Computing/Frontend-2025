import {
    ChatBubbleLeftIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Aspiration from "@/models/aspiration";

export default function AspirationsList({
    aspirations,
}: {
    aspirations: Aspiration[];
}) {
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {aspirations.map((aspiration) => (
                <li
                    key={aspiration.id}
                    className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
                >
                    <div>
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                            <a
                                href={`./aspirations/${aspiration.id}`}
                                className="hover:underline"
                            >
                                {aspiration.subject}
                            </a>
                        </p>
                        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                            <p>
                                <a
                                    href={aspiration.author.profile_picture}
                                    className="hover:underline"
                                >
                                    {aspiration.author.name}
                                </a>
                            </p>
                            <svg
                                viewBox="0 0 2 2"
                                className="h-0.5 w-0.5 fill-current"
                            >
                                <circle cx={1} cy={1} r={1} />
                            </svg>
                            <p>
                                <time
                                    dateTime={aspiration.created_at.toString()}
                                >
                                    {aspiration.created_at.toString()}
                                </time>
                            </p>
                        </div>
                    </div>
                    <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
                        <div className="flex -space-x-0.5">
                            <dt className="sr-only">Commenters</dt>
                            {!aspiration.closed ? (
                                <dd>
                                    <img
                                        className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
                                        src={aspiration.author.profile_picture}
                                        alt={aspiration.author.name}
                                    />
                                </dd>
                            ) : (
                                <>
                                    <dd>
                                        <img
                                            className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
                                            src={
                                                aspiration.author
                                                    .profile_picture
                                            }
                                            alt={aspiration.author.name}
                                        />
                                    </dd>
                                    <dd>
                                        <img
                                            className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
                                            src="https://sg.pufacomputing.live/Logo%20Puma.png"
                                            alt="Admin"
                                        />
                                    </dd>
                                </>
                            )}
                        </div>
                        <div className="flex w-16 gap-x-2.5">
                            <dt>
                                <span className="sr-only">Total comments</span>
                                {aspiration.closed ? (
                                    <CheckCircleIcon
                                        className="h-6 w-6 text-green-400"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <ChatBubbleLeftIcon
                                        className="h-6 w-6 text-gray-400"
                                        aria-hidden="true"
                                    />
                                )}
                            </dt>
                            <dd className="text-sm leading-6 text-gray-900">
                                {aspiration.closed ? (
                                    <span>2</span>
                                ) : (
                                    <span>1</span>
                                )}
                            </dd>
                        </div>
                    </dl>
                </li>
            ))}
        </ul>
    );
}
