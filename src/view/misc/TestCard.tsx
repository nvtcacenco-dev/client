import { Tooltip, Zoom } from "@mui/material";
import { useEffect, useState } from "react";
import { TestCards } from "../../utils/types";

interface TestCardProps {
    title: string;
    color: string;
    type: TestCards;
}

export default function TestCard({ title, color, type }: TestCardProps) {

    const [tooltipTitle, setTooltipTitle] = useState<string>('Copy');

    function handleCopy(status: TestCards) {
        switch (status) {
            case TestCards.SUCCESS:
                navigator.clipboard.writeText(TestCards.SUCCESS).then(function () {
                    setTooltipTitle('Copied');
                }, function (err) {
                    console.error('Async: Could not copy text: ', err);
                });
                break;
            case TestCards.DECLINED_GENERIC:
                navigator.clipboard.writeText(TestCards.DECLINED_GENERIC).then(function () {
                    setTooltipTitle('Copied');
                }, function (err) {
                    console.error('Async: Could not copy text: ', err);
                });
                break;
            case TestCards.DECLINED_INSUFFICIENT_FUNDS:
                navigator.clipboard.writeText(TestCards.DECLINED_INSUFFICIENT_FUNDS).then(function () {
                    setTooltipTitle('Copied');
                }, function (err) {
                    console.error('Async: Could not copy text: ', err);
                });
                break;
            default:
                break;
        }

    }
    return (
        <li className='d-flex col-12 flex-column'>
            <p className={`text-${color} col-12 m-0 p-0 test-info-category-title`} >{title}</p>
            <div className='d-flex column-gap-3 test-info-category-details-container'>
                <Tooltip
                    title={tooltipTitle}
                    placement='bottom'
                    TransitionComponent={Zoom}
                    arrow
                    leaveDelay={100}
                    onClick={() => handleCopy(type)}
                    onClose={() => setTooltipTitle('Copy')}
                    slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, -4],
                                    },
                                },
                            ],
                        },
                    }}
                >
                    <div className='d-flex flex-wrap align-items-center column-gap-1 test-info-category-details flex-grow-1 py-2 card-nr'>
                        <p className='m-0'>Card number:</p>
                        <p className='m-0'>{type}</p>
                    </div>
                </Tooltip>
                <div className='d-flex flex-wrap column-gap-1 test-info-category-details flex-grow-1 py-2'>
                    <p className='m-0'>Expiration date:</p>
                    <p className='m-0'>12/34</p>
                </div>
                <div className='d-flex flex-wrap column-gap-1 test-info-category-details flex-grow-1 py-2'>
                    <p className='m-0'>CVC:</p>
                    <p className='m-0'>567</p>
                </div>
            </div>
        </li>
    )
}