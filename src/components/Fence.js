import React, { useEffect, useState } from 'react';

const Fence = (props) => {
  const [fenceProps, setFenceProps] = useState(props?.data?.fenceProps);
  const [barProps, setBarProps] = useState(props?.data?.barProps);
  const [postProps, setPostProps] = useState(props?.data?.postProps);
  const side = props?.data?.side || 'front';

  useEffect(() => {
    setFenceProps(props.data.fenceProps);
    setBarProps(props.data.barProps);
    setPostProps(props.data.postProps);
  }, [props?.data?.fenceProps, props?.data?.barProps, props?.data?.postProps]);

  const postPosition = [];
    // const fenceHeight = 5;
    // const fenceLength = 100;
    // const numPosts = 22;
    
    const postDistance = fenceProps?.fenceLength / (postProps?.numPosts - 1);

    const postsLeft = Array.from({ length: postProps?.numPosts }).map((_, i) => (
        // <mesh key={i} position={[0, fenceProps?.fenceHeight / 2, i * postDistance - fenceProps?.fenceLength / 2]}>
        //     <boxGeometry args={[0.5, fenceProps?.fenceHeight, 0.1]} />
        //     <meshStandardMaterial color={postProps?.postColor} />
        // </mesh>
        <mesh key={i} position={[0, fenceProps?.fenceHeight / 2, i * postDistance - fenceProps?.fenceLength / 2]}>
            <boxGeometry args={[0.1, fenceProps?.fenceHeight, 0.5]} />
            <meshStandardMaterial color={postProps?.postColor} />
        </mesh>
    ));

    const barsLeft = Array.from({ length: postProps?.numPosts - 1 }).map((_, i) => (
        // <mesh key={i} position={[0, fenceProps?.fenceHeight - 0.5, (i + 0.5) * postDistance - fenceProps?.fenceLength / 2]}>
        //     <boxGeometry args={[postDistance, 0.2, 0.05]} />
        //     <meshStandardMaterial color={barProps?.barColor} />
        // </mesh>

        <mesh key={i} position={[0, fenceProps?.fenceHeight - 0.5, (i + 0.5) * postDistance - fenceProps?.fenceLength / 2]}>
        <boxGeometry args={[0.05, 0.2, postDistance]} />
        <meshStandardMaterial color={barProps?.barColor} />
        </mesh>
    ));

    const postsFront = Array.from({ length: postProps?.numPosts }).map((_, i) => (
        <mesh key={i} position={[i * postDistance - fenceProps?.fenceLength / 2, fenceProps?.fenceHeight / 2, 0]}>
            <boxGeometry args={[0.5, fenceProps?.fenceHeight, 0.1]} />
            <meshStandardMaterial color={postProps?.postColor} />
        </mesh>
    ));

    const barsFront = Array.from({ length: postProps?.numPosts - 1 }).map((_, i) => (
        <mesh key={i} position={[(i + 0.5) * postDistance - fenceProps?.fenceLength / 2, fenceProps?.fenceHeight - 0.5, 0]}>
            <boxGeometry args={[postDistance, 0.2, 0.05]} />
            <meshStandardMaterial color={barProps?.barColor} />
        </mesh>
    ));

    const posts = (side === "left") ? postsLeft : postsFront;
    const bars = (side === "left") ? barsLeft : barsFront;

    return (
        <group position={fenceProps?.fencePosition}>
            {posts}
            {bars}
        </group>
    );
};

export default Fence;