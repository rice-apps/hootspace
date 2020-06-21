import React from "react";

import { useQuery } from "@apollo/react-hooks";

import Discussion from "./Discussion";

import { DISCUSSION_PAGE } from "../server/Queries";
import { DISCUSSION_SUBSCRIPTION } from "../server/Subscriptions";

function DiscussionsWithData() {
    const { subscribeToMore, fetchMore, ...result } = useQuery(
        DISCUSSION_PAGE,
        {
            variables: {
                page: 1,
                perPage: 10,
            },

            fetchPolicy: "cache-and-network",
        },
    );

    return (
        <Discussion
            {...result}
            onLoadMore={(newPage) =>
                fetchMore({
                    updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) {
                            return prev;
                        }

                        console.log(prev);

                        const final = Object.assign({}, prev, {
                            postPagination: {
                                items: [
                                    ...prev.postPagination.items,
                                    ...fetchMoreResult.postPagination.items,
                                ],
                                __typename: "PostPagination",
                            },
                        });

                        return final;
                    },
                    variables: {
                        page: newPage,
                    },
                })
            }
            subscribeToNewDiscussions={() => {
                subscribeToMore({
                    document: DISCUSSION_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData) {
                            return prev;
                        }

                        const newItem = subscriptionData.data.discussionCreated;

                        const alreadyExists =
                            prev.postPagination.items.filter((item) => {
                                return item._id === newItem._id;
                            }).length > 0;

                        if (alreadyExists) {
                            return prev;
                        }

                        return Object.assign({}, prev, {
                            postPagination: {
                                items: [newItem, ...prev.postPagination.items],
                                __typename: "PostPagination",
                            },
                        });
                    },
                });
            }}
        />
    );
}

export default DiscussionsWithData;
