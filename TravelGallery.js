const TravelGallery = () => {
  const { useState, useEffect } = React;
  
  const ImageCard = ({ className, aspectRatio }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const cardId = `image-${aspectRatio.replace('/', '-')}`;
    
    // Simulate image loading
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, Math.random() * 2000 + 1000);
      return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      
      const element = document.getElementById(cardId);
      if (element) observer.observe(element);
      return () => observer.disconnect();
    }, [cardId]);
    
    // Calculate aspect ratio safely
    const calcAspectRatio = () => {
      const [width, height] = aspectRatio.split('/');
      return (parseInt(height) / parseInt(width)) * 100 + '%';
    };
    
    return React.createElement(
      'div',
      {
        id: cardId,
        className: `relative overflow-hidden rounded-lg ${className}`,
        style: { paddingBottom: calcAspectRatio() }
      },
      React.createElement(
        'div',
        {
          className: `
            absolute inset-0 bg-sky-100/20
            before:absolute before:inset-0 before:bg-sky-200/20
            before:transform before:translate-x-[-100%]
            ${!isLoaded ? 'before:animate-shimmer' : ''}
          `
        },
        isLoaded && React.createElement(
          'div',
          {
            className: `
              absolute inset-0 bg-gray-800
              transform transition-transform duration-700 ease-out
              ${isInView ? 'translate-y-0' : 'translate-y-full'}
            `
          },
          React.createElement('img', {
            src: "/api/placeholder/800/600",
            alt: "Travel photograph",
            className: "w-full h-full object-cover"
          })
        )
      )
    );
  };
  
  const galleryItems = [
    { id: 1, aspectRatio: '4/3', className: 'col-span-2 row-span-2' },
    { id: 2, aspectRatio: '16/9', className: 'col-span-1 row-span-1' },
    { id: 3, aspectRatio: '1/1', className: 'col-span-1 row-span-1' },
    { id: 4, aspectRatio: '3/4', className: 'col-span-1 row-span-2' },
    { id: 5, aspectRatio: '16/9', className: 'col-span-2 row-span-1' },
    { id: 6, aspectRatio: '1/1', className: 'col-span-1 row-span-1' },
    { id: 7, aspectRatio: '4/3', className: 'col-span-2 row-span-2' },
    { id: 8, aspectRatio: '3/4', className: 'col-span-1 row-span-2' },
    { id: 9, aspectRatio: '16/9', className: 'col-span-2 row-span-1' },
    { id: 10, aspectRatio: '1/1', className: 'col-span-1 row-span-1' }
  ];
  
  return React.createElement(
    'div',
    { className: "w-full max-w-7xl mx-auto px-4 py-12" },
    React.createElement(
      'div',
      { className: "grid grid-cols-4 gap-4 auto-rows-min" },
      galleryItems.map(item => 
        React.createElement(ImageCard, {
          key: item.id,
          className: item.className,
          aspectRatio: item.aspectRatio
        })
      )
    )
  );
};
